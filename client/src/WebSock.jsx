import React, {useRef, useState} from 'react';
import './app.scss'

const WebSock = () => {
   const [username, setUsername] = useState('')
   const [inputValue, setInputValue] = useState('')
   const [messages, setMessages] = useState([])
   const [connected, setConnected] = useState(false)
   const socket = useRef(null)

   function connect() {
      socket.current = new WebSocket("ws://localhost:5000")
      socket.current.onopen = () => {
         console.log('Соединение открыто')
      }
      socket.current.onclose = () => console.log('Соединение закрыто')
      socket.current.onmessage = (event) => {
         const data = JSON.parse(event.data)
         setMessages(prev => [...prev, data])
      }
      setConnected(true)
   }

   async function sendMessage() {
      socket.current.send(JSON.stringify({
         body: inputValue,
         id: Date.now(),
         username: username
      }))
   }

   function onChangeMessage(event) {
      setInputValue(event.target.value)
   }

   function onChangeUsername(event) {
      setUsername(event.target.value)
   }

   function onKeyDownInput(event) {
      if (event.key === 'Enter') {
         sendMessage()
         setInputValue('')
      }
   }

   function calcStyle(name) {
      if (username === name) {
         return 'msg myMsg'
      } else {
         return 'msg otherMsg'
      }
   }
   console.log(username)
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
}
export default WebSock;
