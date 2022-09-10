import React, { useEffect, useState } from "react";
import './app.scss'
import axios from "axios";

type MessageType = {
	id: number
	body: string
	username: string
}

const EventSourcing: React.FC = () => {
	useEffect(() => {
		subscribe()
	}, [])
	const [ username, setUsername ] = useState('')
	const [ inputValue, setInputValue ] = useState('')
	const [ messages, setMessages ] = useState<MessageType[]>([])

	async function sendMessage() {
		await axios.post('http://localhost:5000/new-messages', {
			body: inputValue,
			id: Date.now(),
			username: username
		})
	}

	async function subscribe() {
		const eventSource = new EventSource('http://localhost:5000/connect')
		eventSource.onmessage = function(event) {
			console.log(event.data)
		}
	}

	function onChangeMessage(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value)
	}

	function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
		setUsername(event.target.value)
	}

	function onKeyDownInput(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && username) {
			sendMessage()
			setInputValue('')
		}
	}

	function calcStyle(name: string) {
		if (username === name) {
			return 'msg myMsg'
		} else {
			return 'msg otherMsg'
		}
	}

	return (
		<div className="app">
			<div className="info">
				<p><strong>Username</strong></p>
				<input className={'username'} type="text" value={username} onChange={onChangeUsername}
							 placeholder={'Username'}/>
				<p><strong>Message</strong></p>
				<input className={'userMsg'} type="text" value={inputValue} onChange={onChangeMessage} onKeyDown={onKeyDownInput}/>
			</div>
			<div className="deskMsg">
				{messages.map(msg =>
					<div className={'message-card'} key={msg.id}>
						<p className={calcStyle(msg.username)}>
							{msg.body}
						</p>
						{msg.username === username ? '' : <span className={'message-card__username'}>{msg.username}</span>}
					</div>

				)}
			</div>
		</div>
	)
}

export default EventSourcing
