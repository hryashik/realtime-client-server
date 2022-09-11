import React, { useRef, useState } from 'react';
import Message from "./components/Message/Message";
import './app.scss'

type MessageType = {
	body: string
	id: number
	username: string
}

const WebSock: React.FC = () => {
	// Init states
	const [ username, setUsername ] = useState('')
	const [ inputValue, setInputValue ] = useState('')
	const [ messages, setMessages ] = useState<MessageType[]>([])
	const [ connected, setConnected ] = useState(false)
	const socket = useRef<WebSocket>()

	// Create all functions-handlers
	function connect() {
		socket.current = new WebSocket("ws://localhost:5000")
		socket.current.onopen = () => {
			console.log('Соединение открыто')
		}
		socket.current.onclose = () => console.log('Соединение закрыто')
		socket.current.onmessage = (event) => {
			const data = JSON.parse(event.data)
			setMessages(prev => [ ...prev, data ])
		}
		setConnected(true)
	}

	async function sendMessage() {
		socket.current?.send(JSON.stringify({
			body: inputValue,
			id: Date.now(),
			username: username
		}))
	}

	function onChangeMessage(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value)
	}

	function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
		setUsername(event.target.value)
	}

	function onKeyDownInput(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			sendMessage()
			setInputValue('')
		}
	}

	if (!connected) {
		return (
			<div className={'login'}>
				<input className={'username'}
							 type="text"
							 value={username}
							 onChange={onChangeUsername}
							 placeholder={'Username'}
							 onKeyDown={event => {
								 if (event.key === 'Enter') {
									 connect()
								 }
							 }}
				/>
				<button onClick={connect}>Войти</button>
			</div>
		)
	} else {
		return (
			<div className="app">
				<div className="info">
					<p><strong>Message</strong></p>
					<input className={'userMsg'} type="text" value={inputValue} onChange={onChangeMessage}
								 onKeyDown={onKeyDownInput}/>
				</div>
				<div className="deskMsg">
					{messages.map(msg => <Message msg={msg} username={username} key={msg.id}/>)}
				</div>
			</div>
		)
	}
}
export default WebSock;
