const express = require('express'),
    bodyParser = require('body-parser'),
    couchbase = require('couchbase'),
    ottoman = require('ottoman');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.setHeader('Access-Control-Allow-Methods', 'POST');
    response.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header, Content-Type');
    next();
});

var cluster = new couchbase.Cluster('couchbase://localhost');
var bucket = cluster.openBucket('peliculas', "123456");

module.exports.bucket = bucket;

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

const routes = require('./routes')(app);

ottoman.ensureIndices((error) => {
    if (error) {
        console.log(error);
        return;
    }
    app.listen(3000, (error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Servidor funcionando en el puerto 3000');
    })
});