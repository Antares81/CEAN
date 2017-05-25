/**
 * Get longitude and latitude of an address using callbacks to return the result
 */

// request is used to question external web service
const request = require('request');

// googlemaps api
const BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?address=";

/**
 * Return the longitude and latitude of an address using callbacks to return the result
 * @param {*} adress the address
 * @param {*} callback the result
 */
var getGeoCode = (adress, callback) => {
    var direccion = BASE_URL + encodeURIComponent(adress)
    if (direccion && direccion != "") {
        request({
            url:direccion,
            json: true
        }, (error, response, body) => {
            if (error) {
                callback(error, null);
            } else if (body.status === 'OK') {
                callback(null, {
                    latitud:body.results[0].geometry.location.lat,
                    longitud:body.results[0].geometry.location.lng
                });
            } else if (body.status === "ZERO_RESULTS") {
                callback('No se han obtenido resultados', null);
            } else if (body.status === "INVALID_REQUEST") {
                callback('Debe poner una dirección', null);
            }
        });
    }
}

// Published methods
module.exports = {
    getGeoCode
}