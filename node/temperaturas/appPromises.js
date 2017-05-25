/**
 * Main file with promises. Uses our own files geocodePromises.js and weatherPromises.js
 */

// yargs is used to catch arguments in command line
const yargs = require('yargs');

// Own requires
const geocodePromises = require('./geocodePromises');
const weatherPromises = require('./weatherPromises');

var argv = yargs.argv;

// Check de argument existence
if (argv.adress && argv.adress != "") {
    //working with promises
    geocodePromises.getGeoCodePromises(argv.adress).then((resultado => {
        console.log(`Latidud: ${resultado.latitud}`);
        console.log(`Longitud: ${resultado.longitud}`);
        //working with promises
        return weatherPromises.getTemperaturePromises(resultado.latitud, resultado.longitud);
    }))
    .then((resultado)=> {
        console.log(resultado.temperature);
    })
    .catch((error) => {
        console.log(error);
    });
} else {
    console.log("El formato del comando es: node app [dirección].\nPor favor, introduzca el parámetro que falta");
}