/**
 * Requires zone
 */
var MessageModel = require('./model').MessageModel;

/**
 * 
 * @param {*} app application
 */
var appRouter = (app) => {

    /**
     * Home page
     */
    app.get('/', (req,res) => {
        res.sendFile(__dirname + '/index.html');
    });

    /**
     * Add a new message
     */
    app.post('/newMessage', (req, res) => {
        var message = new message({
            message: req.body.message
        });
        message.save((error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });

    /**
     * Load message
     */
    app.get('/messages', (req, res) => {
        MessageModel.find({}, (error, result) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });
}

/**
 * Export routes
 */
module.exports = appRouter;