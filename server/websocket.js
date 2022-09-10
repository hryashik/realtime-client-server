const ws = require('ws')
const {WebSocketServer} = ws

const wss = new ws.WebSocketServer({
   port: 5000,
}, () => console.log('Server starting on 5000'))

wss.on('connection', ws => {
   ws.on('message', (message, isBinary) => {
      wss.clients.forEach(client => client.send(message, {binary: isBinary}))
   })
})
