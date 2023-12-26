
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://3.27.202.108:3000/',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log(`User connected successfully: ${socket.id}`);
  socket.emit('me', socket.id)

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended')
  })

  socket.on('calluser',(data)=>{
    io.to(data.userToCall).emit('calluser',{signal:data.signalData, from:data.from, name: data.name})
  })
socket.on('answerCall',(data)=>{
  io.to(data.to).emit('callAccepted',data.signal)
})

});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});