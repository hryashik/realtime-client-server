import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const WebSock = () => {

   const [username, setUsername] = useState('')
   const [inputValue, setInputValue] = useState('')
   const [messages, setMessages] = useState([])
   const [connected, setConnected] = useState(false)
   const socket = useRef(null)

   /* function connect() {
       socket.current = new WebSocket('ws://localhost:5000')
       socket.current.onopen = () => {
          setConnected(true)

       }
       socket.current.onmessage = () => {

       }
       socket.current.onclose = () => {
          console.log('Сокет закрыт')
       }
       socket.current.onerror = () => {

       }
    }*/

   useEffect(() => {
      socket.current = new WebSocket("ws://localhost:5000")
      socket.current.onopen = () => console.log('Соединение открыто')
      socket.current.onclose = () => console.log('Соединение закрыто')
      socket.current.onmessage = (event) => console.log(JSON.parse(event.data))
   }, [])

   async function sendMessage() {
      /*await axios.post('http://localhost:5000', {
         body: inputValue,
         id: Date.now(),
         username: 'hryashik'
      })*/
      socket.current.send(JSON.stringify({
         body: inputValue,
         id: Date.now(),
         username: 'hryashik'
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

   /*if (!connected) {
      return (
         <div>
            <p><strong>Username</strong></p>
            <input className={'username'} type="text" value={username} onChange={onChangeUsername}
                   placeholder={'Username'}/>
            <button>Войти</button>
         </div>
      )
   }*/

   return (
      <div className="app">
         <div className="info">
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
};

export default WebSock;
