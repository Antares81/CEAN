/**
 * Requires zone
 */
var PersonModel = require('./models').PersonModel;
var CommentModel = require('./models').CommentModel;

/**
 * 
 * @param {*} app application
 */
var appRouter = (app) => {

    /**
     * Load all persons with his/her comments
     */
    app.get('/person', (req, res) => {
        PersonModel.find({}, {load:["comments"]}, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Load person with his/her comments
     */
    app.get('/person/:id', (req, res) => {
        PersonModel.getById(req.params.id, {load:["comments"]}, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Find person with his/her comments by email
     */
    /*app.get('/person/findByEmail/:email', (req, res) => {
        PersonModel.find({email: req.params.email}, {load:["comments"]}, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });*/

    /**
     * Find person with his/her comments by email
     */
    app.get('/person/findByEmail/:email', (req, res) => {
        PersonModel.findByEmail(req.params.email, {load:["comments"]}, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Add new person
     */
    app.post('/person', (req, res) => {
        var person = new PersonModel({
            name: {
                first: req.body.name.first,
                last: req.body.name.last
            },
            email: req.body.email
        });
        person.save((error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Save new message for a person
     */
    app.post('/comment', (req, res) => {
        PersonModel.getById(req.body.id, {load:["comments"]}, (error, person) => {
            if (error) {
                return res.status(400).send(error);
            }

            var comment = new CommentModel({
                message: req.body.message
            });

            comment.save((error, result) => {
                if (error) {
                    return res.status(400).send(error);
                }
                person.comments.push(comment);
                person.save((error, result) => {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    res.send(result);
                });
            });
        });
    });
};

/**
 * Export routes
 */
module.exports = appRouter;