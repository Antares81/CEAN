/**
 * Requires zone
 */
var PersonModel = require('./models').PersonModel;
var CommentModel = require('./models').CommentModel;

/**
 * 
 * @param {*} app the application
 */
var appRouter = (app) => {

    /**
     * Get all persons
     */
    app.get('/person', (req, res) => {
        PersonModel.getAll((error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Get person by ID
     */
    app.get('/person/:id', (req, res) => {
        PersonModel.getById(req.params, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Save new person
     */
    app.post('/person', (req, res) => {
        PersonModel.save(req.body, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Add new comment for a person
     */
    app.post('/comment', (req, res) => {
        CommentModel.create(req.body, (error, comment) => {
            if (error) {
                return res.status(400).send(error);
            }
            PersonModel.getById(req.body, (error, person) => {
                if (error) {
                    return res.status(400).send(error);
                }

                let comments = person.comments ? person.comments : new Array();
                comments.push(comment.id);
                person.comments = comments;

                person.id = req.body.id;
                PersonModel.save(person, (error, result) => {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    res.send(person);
                });
            });
        });
    });
};

/**
 * Export routes
 */
module.exports = appRouter;