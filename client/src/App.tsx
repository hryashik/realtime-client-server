import React, { useEffect, useState } from "react";
import './app.css'
import axios from "axios";

const App: React.FC = () => {
	useEffect(() => {
		subscribe()
	}, [])
	const [userName, setUserName] = useState('')
	const [ inputValue, setInputValue ] = useState('')
	const [messages, setMessages] = useState<{id: number, body: string}[]>([])
	async function sendMessage() {
		await axios.post('http://192.168.1.3:5000/new-messages', {
			body: inputValue,
			id: Date.now(),
			userName: userName
		})
	}
	async function subscribe() {
		try {
			const {data} = await axios.get('http://192.168.1.3:5000/get-messages')
			setMessages(prev => [data, ...prev])
			await subscribe()
		} catch (e) {
			setTimeout(() => subscribe(), 500)
		}
	}

	function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(event.target.value)
	}
	function onKeyDownInput(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			sendMessage()
			setInputValue('')
		}
	}

	return (
		<div className="app">
			<div className="info">
				<input type="text" value={inputValue} onChange={onChangeInput} onKeyDown={onKeyDownInput}/>
			</div>
			<div className="deskMsg">
				{/*{messages.map(msg =>
					<div className={'message'} key={msg.id}>
						{msg.body}
					</div>
				)}*/}
				<p className={'msg'} style={{alignSelf: 'flex-end'}}>123</p>
				<p className={'msg'}>123</p>
			</div>
		</div>
	)
}

export default App
