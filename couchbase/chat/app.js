/**
 * Require zone and express server creation
 */
const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const couchbase = require ('couchbase');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/**
 * Couchbase cluster
 */
var cluster = new couchbase.Cluster('couchbase://localhost');

/**
 * Couchbase bucket
 */
var bucket = cluster.openBucket('chat', 'chat', (error) => {
    if (error) {
        console.log(`No se ha podido abrir el bucket`);
        return;
    }
    console.log(`Bucket autenticado`);
});

/**
 * Publishing couchbase bucket
 */
module.exports.bucket = bucket;

/**
 * Require own routes file
 */
var routes = require('./routes')(app);

/**
 * Opening server
 */
const port = process.env.PORT || 3000;
server.listen(port, (error) => {
    if (error) {
        return;
    }
    console.log(`Servidor escuchando el puerto 3000`);
});

/**
 * Opening socket and adding events
 */
io.sockets.on('connection', (socket) => {
    console.log(`Inicio conexión socket`);
    socket.on('nuevo usuario', (data, callback) => {
        console.log(`Nuevo usuario: ${data.data}`);
        callback({data:'ACK'});
    });
    socket.on('newMessage', (message, callback) => {
        console.log(`Nuevo mensaje: ${message.message}`);
        app.request.body.message=message.message;
        io.sockets.emit('newMessage', {msg:message.message});
    });
});