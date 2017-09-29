var FilmModel = require('./model').FilmModel;


module.exports = function (app) {

    app.get('/films', (request, response) => {
        FilmModel.find({}, (error, films) => {
            //response.setHeader('Access-Control-Allow-Origin', '*');
            if (error) {
                return response.status(400).send(error);
            }
            response.send(films)
        })
    });

    app.post('/films', (request, response) => {
        console.log("POST comming")
        //response.setHeader('Access-Control-Allow-Origin', '*');
        console.log(request.body)
        let film = new FilmModel({
            name: request.body.name,
            genre: request.body.genre,
            format: {
                digital: request.body.format.digital,
                bluray: request.body.format.bluray,
                dvd: request.body.format.dvd
            }
        });
        film.save((error) => {

            if (error) {
                return response.status(400).send(error);
            }
            response.send(film);
        });
    });

    app.get('/films/:name', (request, response) => {
        let name = request.params.name;
        FilmModel.find({ name: name }, (error, films) => {
            //response.setHeader('Access-Control-Allow-Origin', '*');
            if (error) {
                return response.status(400).send(error);
            }
            response.send(films)
        })
    });
}

