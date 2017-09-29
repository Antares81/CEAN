const ottoman = require('ottoman'),
    couchbase = require('couchbase'),
    bucket = require('./app').bucket;

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

var FilmModel = ottoman.model("Film", {
    name: "string",
    genre: "string",
    format: {
        digital: "boolean",
        bluray: "boolean",
        dvd: "boolean"
    }
});

module.exports.FilmModel = FilmModel;