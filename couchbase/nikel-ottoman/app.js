/**
 * Requires zone
 */
var express = require('express'),
    bodyParser = require ('body-parser'),
    couchbase = require ('couchbase'),
    ottoman = require('ottoman');

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
var bucket = cluster.openBucket('default');
/**
 * Export couchbase bucket
 */
module.exports.bucket = bucket;

/**
 * Require own routes file
 */
var routes = require('./routes')(app);

//ottoman.bucket = bucket;
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

/**
 * Ottoman init and server init
 */
ottoman.ensureIndices((error) => {
    if (error) {
        return console.log(error);
    }

    app.listen(3000, (error) => {
        if (error) {
            return;
        }
        console.log(`Servidor escuchando el puerto 3000`);
    });
});