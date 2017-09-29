/**
 * Require zone
 */
var uuid = require ('uuid'),
    bucket = require('./app').bucket,
    N1qlQuery = require('couchbase').N1qlQuery;

/**
 * Airline model
 */
function AirlineModel() {};

/**
 * Get airline by ID
 */
AirlineModel.getById = function (key, callback) {
    bucket.get(key, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result.value);
    });
};

/**
 * Delete airline by ID
 */
AirlineModel.remove = function (key, callback) {
    bucket.remove(key, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result.value);
    });
};

/**
 * Save new airline
 */
AirlineModel.saveAirline = function (key, value, callback) {
    //var statement = `INSERT INTO ${bucket._name} VALUES ($1,$2)`;
    var statement = "INSERT INTO `" + bucket._name +"` VALUES ($1,$2)";
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, [key, value], (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

/**
 * Replace airline
 */
AirlineModel.replace = function (key, value, callback) {
    bucket.replace(key, value, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result.value);
    });
};

/**
 * Get airport by name
 */
AirlineModel.getAirportByName = function (name, callback) {
    var statement = "SELECT * FROM `" + bucket._name +"` WHERE name = $1 AND type='airline'";
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, [name], (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

/**
 * Update airport name anda airpot IATA code
 */
AirlineModel.updateNameAndIATA = function (key, name, iata, callback) {
    var statement = "UPDATE `" + bucket._name +"` USE KEYS ($1) SET name = $2, iata = $3";
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, [key, name, iata], (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

/**
 * Delete airlines by ID's
 */
AirlineModel.delete = function (key, callback) {
    var statement = "DELETE FROM `" + bucket._name +"` USE KEYS ($1) RETURNING id";
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, [key], (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

/**
 * Export airline model
 */
module.exports = { 
    AirlineModel
};