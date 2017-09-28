/**
 * Requires zone
 */
const yargs = require('yargs');

/**
 * Own require
 */
const notes = require('./notes');

var argv = yargs.argv;
console.log(argv);

var title, description = null;

/**
 * Check if title exist
 */
function checkTitle() {
    //title = process.argv[3];
    title = argv.title;
    return (title && title !== "");
}

/**
 * Test if description exists
 */
function checkDescription() {
    //description = process.argv[4];
    description = argv.desc;
    return (description && description !== "");
}

//consola
//node app add titulo descripcion
//var command = process.argv[2];
var command = argv._[0];

console.log(`Comando: ${command}`);

/**
 * Commands logic
 */
if (command === "add") {
    if (checkTitle() && checkDescription()) {
        notes.addNote(title, description);
    } else {
        console.log('El formato deberá de ser: node app add [titulo] [descripción]');
    }
} else if (command === "remove") {
    if (checkTitle()) {
        var removed = notes.removeNote(title);
        var msg = removed ? `Se ha eliminado la nota ${title}` : `No se ha eliminado ninguna nota`;
        console.log(msg);
    } else {
        console.log('El formato deberá de ser: node app remove [titulo]');
    }
} else if (command === "get") {
    if (checkTitle()) {
        let nota = notes.getNote(title);
        if (nota) {
            console.log(`${nota.title}`);
        }
    } else {
        console.log('El formato deberá de ser: node app get [titulo]');
    }
} else if (command === "list") {
    let lista = notes.getNotes();
    lista.forEach((item) => {
        console.log(`${item.title}\n`);
    });
} else if (command === "edit") {
    if (checkTitle() && checkDescription()) {
        notes.editNote(title, description);
    } else {
        console.log('El formato deberá de ser: node app edit [titulo] [descripción]');
    }
} else {
    console.log('No se reconoce el comando. Los comandos permitidos son:\nadd\nremove\nget\nlist\nedit');
}