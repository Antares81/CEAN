/**
 * Main file without promises. Uses our own files geocode.js and weather.js
 */

// yargs is used to catch arguments in command line
const yargs = require('yargs');

// Own requires
const geocode = require('./geocode');
const weather = require('./weather');

var argv = yargs.argv;

// Check de argument existence
if (argv.adress && argv.adress != "") {
    //working with callbacks
    geocode.getGeoCode(argv.adress, (error, data) => {
        if (error) {
            console.log(error);
        } else if (data) {
            console.log(`Latidud: ${data.latitud}`);
            console.log(`Longitud: ${data.longitud}`);
            //working with callbacks
            weather.getTemperature(data.latitud, data.longitud, (error, data) => {
                if (error) {
                    console.log(error);
                } else if (data) {
                    console.log(data.temperature);
                }
            });
        }
    });
} else {
    console.log("El formato del comando es: node app [dirección].\nPor favor, introduzca el parámetro que falta");
}