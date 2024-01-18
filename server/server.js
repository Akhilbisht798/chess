const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
require('dotenv').config()

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
	cors: clientUrl
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send("<h1>Server the frontend</h1>")
})

io.on('connection', (socket) => {
  console.log('a user connected');

  // Chess
  socket.on('room', (room) => {
	  socket.join(room);
  })

  socket.on('move-made', (data) => {
	  socket.broadcast.to(data.room).emit('opponent-move', data.fen)
  })

  // Chat
  socket.on('send-chat', (data) => {
	  socket.broadcast.to(data.room).emit('recive-chat', data.chat);
  })
});

server.listen(port, () => {
	console.log(port)
})