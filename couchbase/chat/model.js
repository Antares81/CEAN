/**
 * Requires zone
 */
var couchbase = require ('couchbase');
var bucket = require('./app').bucket;
var ottoman = require('ottoman');

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

/**
 * Message model with ottoman
 */
var MessageModel = ottoman.model("Message", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    message: "string"
});

/**
 * Publishing the menssage model
 */
module.exports = {
    MessageModel
}