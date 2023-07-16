const express = require('express')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://10.0.2.2:3000/'
  }
})

const PORT = 4000

let chatgroups = []

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user is just connected`)

  socket.on('getAllGroups', () => {
    socket.emit('groupList', chatgroups)
  })

  socket.on('createNewGroup', (currentGroupName) => {
    console.log(currentGroupName)
    chatgroups.unshift({ id: chatgroups.length + 1, currentGroupName, messages: [] })
    socket.emit('groupList', chatgroups)
  })

})

app.get('/api', (req, res) => {
  res.json(chatgroupd)
})

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})