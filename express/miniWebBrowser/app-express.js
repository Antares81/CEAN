//Requires zone
var express = require('express');

// Express server creation
var app = express();

var port = process.env.PORT || 3000;

/*
app.all('/', (request, response) => {
    response.send("<strong>Hola mundo_ALL</stong>");
});
*/

// Responding a get petition
app.get('/', (request, response) => {
    response.send(`<strong>Hola mundo_GET</stong>`);
});

// Responding a post petition
app.post('/', (request, response) => {
    response.send(`<strong>Hola mundo_POST</stong>`);
});

// Responding a get petition
app.get('/contacto', (request, response) => {
    response.send(`Info del contacto`);
});

// Responding a delete petition with parameters
app.delete('/contacto/:id', (request, response) => {
    let identificador = request.params.id;
    console.log(`ID: ${identificador}`);
    response.send(`Borrado el contacto contacto ${identificador}`);
});

//Start express server listen
app.listen(port, () => {
    console.log(`Servidor Express escuchando sobre el puerto ${port}`)
});