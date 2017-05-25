/**
 * Get longitude and latitude of an address using promises
 */

// request is used to question external web service
const request = require('request');

const BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?address=";

/**
 * Return the longitude and latitude of an address using promises
 * @param {*} adress the address
 */
var getGeoCodePromises = (adress) => {
    return new Promise((resolve, reject) => {
        var direccion = BASE_URL + encodeURIComponent(adress)
       
        if (direccion && direccion != "") {
            request({
                url:direccion,
                json: true
            }, (error, response, body) => {
                if (error) { 
                    reject(error);
                } else if (body.status === 'OK') {
                    resolve({
                        latitud:body.results[0].geometry.location.lat,
                        longitud:body.results[0].geometry.location.lng
                    });
                } else if (body.status === "ZERO_RESULTS") {
                    reject('No se han obtenido resultados');
                } else if (body.status === "INVALID_REQUEST") {
                    reject('Debe poner una dirección');
                }
            });
        } else {
            reject('La dirección no puede estar vacía');
        }
    });
}

// Published methods
module.exports = {
    getGeoCodePromises
}