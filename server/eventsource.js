const express = require('express')
const events = require('events')
const cors = require('cors')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
const emitter = new events.EventEmitter()

app.get('/connect', (req, res) => {
   res.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
   })
   emitter.on('newMessage', (message) => {
      res.write(`${message}`)
   })
})

app.post('/new-messages', (req, res) => {
   const message = req.body
   emitter.emit('newMessage', message)
   res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
