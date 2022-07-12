const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

    let mensagens = [];

io.on('connection', (socket) =>{
    console.log('Usuário conectado');

    socket.emit('msgAnteriores', mensagens);

    socket.on('chat message', (msg) => {
        mensagens.push(msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log("Usuário desconectado");
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
