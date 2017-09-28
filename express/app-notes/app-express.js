/**
 * Requires zone
 */
const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

/**
 * Own requires
 */
const notes = require('./notes');
const notesPromisess = require('./notesPromisess');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,`public`)));

var port = process.env.PORT || 3000;

/**
 * Add a new note
 */
app.post('/contacto/add/:title/:description', (request, response) => {
    let title = request.params.title;
    let description = request.params.description;
    if (title && title !== "" && description && description !== "" ) {
        notesPromisess.addNote(title, description).then((resultado) => {
            response.send(`Se ha añadido la nota con título ${title} y descripción ${description}`);
        })
        .catch((error) => {
            response.send(error);
        });
    } else {
        response.send(`El título y la descripción de la nota son obligatorios`);
    }
});

/**
 * Delete note
 */
app.delete('/contacto/remove/:title', (request, response) => {
    let title = request.params.title;
    if (title && title !== "") {
        notesPromisess.removeNote(title).then((resultado) => {
            response.send(resultado ? `Se ha eliminado correctamente la nota con título ${title}` :
                `No se ha encontrado ninguna nota con título ${title}`);
        })
        .catch((error) => {
            response.send(error);
        });
    } else {
        response.send(`El título de la nota es obligatorio`);
    }
});

/**
 * Get note
 */
app.get('/contacto/get/:title', (request, response) => {
    let title = request.params.title;
    if (title && title !== "") {
        notesPromisess.getNote(title).then((resultado) => {
            if (resultado) {
                response.send(`La nota ${title} tiene la descripción ${resultado.desc}`);
            } else {
                response.send(`No se ha encontrado ninguna nota con título ${title}`);
            }
        })
        .catch((error) => {
            response.send(error);
        });
    } else {
        response.send(`El título de la nota es obligatorio`);
    }
});

/**
 * List notes
 */
app.get('/contacto/list', (request, response) => {
    notesPromisess.getNotes().then((resultado) => {
        let msg = "";
        resultado.forEach((item) => {
            msg+=`${item.title}\t${item.desc}</br>`;
        });
        response.send(msg);
    })
    .catch((error) => {
        response.send(error);
    });
});

/**
 * Edit note
 */
app.post('/contacto/edit/:title/:description', (request, response) => {
    let title = request.params.title;
    let description = request.params.description;
    if (title && title !== "" && description && description !== "" ) {
        notesPromisess.editNote(title, description).then((resultado) => {
            response.send(`Se ha modficado la nota con título ${title} poniendole la descripción ${description}`);
        })
        .catch((error) => {
            response.send(error);
        })        
    } else {
        response.send(`El título y la descripción de la nota son obligatorios`);
    }
});

/**
 * Test server
 */
app.post('/note', (request, response) => {
    let title = request.body.titulo;
    let desc = request.body.descripcion;
    console.log(`Info params body: ${title} - ${desc}`);
    response.send(`Correcto -> ver consola`);
})

/**
 * Open express server
 */
app.listen(port, () => {
    console.log(`Servidor Express escuchando sobre el puerto ${port}`)
});