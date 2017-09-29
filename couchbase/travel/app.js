/**
 * Require zone
 */
var express = require('express'),
    bodyParser = require ('body-parser'),
    couchbase = require ('couchbase');

/**
 * Express application
 */    
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/**
 * Couchbase cluster
 */
var cluster = new couchbase.Cluster('couchbase://localhost');
/**
 * Couchbase bucket
 */
var bucket = cluster.openBucket('travel-sample', 'travel', (error) => {
    if (error) {
        console.log(`No se ha podido abrir el bucket`);
        return;
    }
    console.log(`Bucket autenticado`);
});
/**
 * Export couchbase bucket
 */
module.exports.bucket = bucket;

/**
 * Using own routes file
 */
var routes = require('./routes')(app);

/**
 * Server starting
 */
app.listen(3000, (error) => {
    if (error) {
        return;
    }
    console.log(`Servidor escuchando el puerto 3000`);
});