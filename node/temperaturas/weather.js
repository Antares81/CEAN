/**
 * Get temperature of a latitude and longitude using callbacks to return the result
 */

// request is used to question external web service
const request = require('request');

// darksky api. You have to register to obtain your api key
const BASE_URL = "https://api.darksky.net/forecast/{yourApiKey}/";
const UNITS = "units=si";

/**
 * Return the temperature of a latitude and longitude using callbacks to return the result
 * @param {*} latitud the latitude
 * @param {*} longitud the longitude
 * @param {*} callback the result
 */
var getTemperature = (latitud, longitud, callback) => {
    if (latitud && longitud) {
        request({
            url:`${BASE_URL}${latitud},${longitud}?${UNITS}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                callback(error, null);
            } else if (response.statusCode === 200 ) {
                callback(null, {
                    temperature:body.currently.temperature
                });
            }
        });
    }
}

// Published methods
module.exports = {
    getTemperature
}