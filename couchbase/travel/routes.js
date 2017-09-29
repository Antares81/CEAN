/**
 * REquires zone
 */
var AirlineModel = require('./model').AirlineModel;

/**
 * 
 * @param {*} app application
 */
var appRouter = (app) => {

    /**
     * Constants to use
     */
    let key = 'airline_10';
    let value = {
        "id": 10,
        "type": 'airline',
        "name": '40-Mile Air',
        "iata": 'Q5',
        "icao": 'MLA',
        "callsing": 'MILE-AIR',
        "country": 'United States'
    };
    
    /*AirlineModel.getById(key, (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
        AirlineModel.remove(key, (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(`La aerolínea ${key} se ha eliminado`);
            AirlineModel.saveAirline(key, value,(error, result) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(`La aerolínea ${key} se ha creado`);
                value = {
                    "id": 10,
                    "type": 'airline',
                    "name": '40-Mile Air',
                    "iata": 'Q5',
                    "icao": 'MLA',
                    "callsing": 'MILE-AIR',
                    "country": 'Spain'
                };
                AirlineModel.replace(key, value,(error, result) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    console.log(`La aerolínea ${key} se ha modificado`);
                });
            });
        });
    });*/

    /*AirlineModel.getById('airline_10', (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
    });

    AirlineModel.remove('airline_10', (error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`El registro se ha eliminado correctamente`);
    });

    AirlineModel.saveAirline(key, value,(error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`La aerolínea ${key} se ha guardado`);
    });

    value = {
        "id": 10,
        "type": 'airline',
        "name": '40-Mile Air',
        "iata": 'Q5',
        "icao": 'MLA',
        "callsing": 'MILE-AIR',
        "country": 'Spain'
    };

    AirlineModel.replace(key, value,(error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`La aerolínea ${key} se ha modificado`);
    });

    let name = "American Airlines";
    AirlineModel.getAirportByName(name ,(error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
    });*/
    
    /*key = 'airline_10123';
    let name = 'Gustavo';
    let iata = 'GGR';
    AirlineModel.updateNameAndIATA(key, name, iata ,(error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`La aerolínea ${key} se ha modificado`);
    });*/
    
    AirlineModel.delete(key, (error, result, meta) => {
        if (error) {
            console.log(error);
            return;
        }
        if (meta && meta.metrics.resultCount > 0) {
            console.log(`La aerolínea ${key} se ha eliminado`);
        } else {
            console.log(`La aerolínea ${key} no se ha encontrado`);
        }
    });
}

module.exports = appRouter;