const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let players = [];
let winner = null;

io.on('connection', (socket) => {
  socket.on('join', (name) => {
    players.push(name);
    io.emit('players', players);
  });

  socket.on('bingo', () => {
    if (!winner) {
      winner = players.find(p => socket.id);
      io.emit('winner', winner);
    }
  });

  socket.on('disconnect', () => {
    // Optional: handle disconnect
  });
});

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});