const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: "http://localhost:5173"
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send("<h1>Server the frontend</h1>")
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('room', (room) => {
	socket.join(room);
	console.log('joined room ', room);
  })

  socket.on('move-made', (data) => {
	console.log(data)
	socket.broadcast.to(data.room).emit('opponent-move', data.fen)
  })
});

server.listen(port, () => {
	console.log(port)
})