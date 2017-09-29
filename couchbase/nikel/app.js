/**
 * Require zone
 */
var express = require('express'),
    bodyParser = require ('body-parser'),
    couchbase = require ('couchbase');

/**
 * Express creation
 */
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/**
 * Couchbase cluster
 */
var cluster = new couchbase.Cluster('couchbase://localhost');
/**
 * Couchbase cluster
 */
var bucket = cluster.openBucket('default');
/**
 * Export bucket
 */
module.exports.bucket = bucket;

/**
 * Use own routes file
 */
var routes = require('./routes')(app);

/**
 * Init server
 */
app.listen(3000, (error) => {
    if (error) {
        return;
    }
    console.log(`Servidor escuchando el puerto 3000`);
});