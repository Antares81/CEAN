/**
 * Requires zone
 */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

/**
 * First redirection
 */
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

/**
 * 
 */
/*io.sockets.on('connection', (socket) => {
    console.log(`Inicio conexión socket`);
    socket.on('nuevo usuario', (data, callback) => {
        console.log(`Nuevo usuario: ${data.data}`);
        socket.emit('respuesta', {data:'ACK'});
    });
});*/

/**
 * Oppening the socket an suscribe the events
 */
io.sockets.on('connection', (socket) => {
    console.log(`Socket start`);
    socket.on('new user', (data, callback) => {
        console.log(`New user: ${data.data}`);
        callback({data:'ACK'});
    });
    socket.on('newMessage', (message, callback) => {
        console.log(`New message: ${message.message}`);
        io.sockets.emit('newMessage', {msg:message.message});
        //callback({message:'ACK'});
    });
});

/**
 * Lifting up the express server
 */
const port = process.env.PORT || 3000;
server.listen(port, (error) => {
    if (error) {
        return console.log(`Algo ha fallado: ${error}`);
    }
    console.log(`Servidor Express escuchando sobre el puerto ${port}`)
});