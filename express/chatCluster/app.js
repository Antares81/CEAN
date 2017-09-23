/**
 * Requires zone
 */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const port = process.env.PORT || 3000;

/**
 * Oppening the cluster
 */
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`worker ${worker.process.pid} online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
    const express = require('express');
    const app = express();
    const http = require('http');
    const server = require('http').createServer(app);
    const io = require('socket.io').listen(server);

    /**
     * Opening the server
     */
    server.listen(port, (error) => {
        if (error) {
            return console.log(`Algo ha fallado: ${error}`);
        }
        console.log(`Servidor Express escuchando sobre el puerto ${port}`)
    });
    
    /**
     * First page
     */
    app.get('/', (req,res) => {
        res.sendFile(__dirname + '/index.html');
    });

    /**
     * Oppening the socket and susbcribe the events
     */
    io.sockets.on('connection', (socket) => {
        console.log(`Inicio conexión socket`);
        socket.on('new user', (data, callback) => {
            console.log(`new user: ${data.data}`);
            callback({data:data.data});
        });
        socket.on('newMessage', (message, callback) => {
            console.log(`New message: ${message.message}`);
            io.sockets.emit('newMessage', {msg:message.message});
        });
    });
}