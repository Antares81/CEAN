/**
 * Get temperature of a latitude and longitude using promises
 */

// request is used to question external web serviceconst
request = require('request');

// darksky api. You have to register to obtain your api key
const BASE_URL = "https://api.darksky.net/forecast/{yourApiKey}/";
const UNITS = "units=si";

/**
 * Return the temperature of a latitude and longitude using callbacks to return the result
 * @param {*} latitud the latitude
 * @param {*} longitud the longitude
 */
var getTemperaturePromises = (latitud, longitud) => {
    return new Promise ((resolve, reject) => {
        if (latitud && longitud) {
            request({
                url:`${BASE_URL}${latitud},${longitud}?${UNITS}`,
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else if (response.statusCode === 200 ) {
                    resolve({
                        temperature:body.currently.temperature
                    });
                }
            });
        }
    });
}

// Published methods
module.exports = {
    getTemperaturePromises
}