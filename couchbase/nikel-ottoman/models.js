/**
 * Requires zone
 */
var ottoman = require('ottoman'),
    bucket = require('./app').bucket,
    couchbase = require ('couchbase');

/**
 * Ottoman store
 */
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

/**
 * Person model
 */
var PersonModel = ottoman.model("Person", {
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    },
    name: {
        first: "string",
        last: "string"
    },
    email: "string",
    comments: [
        {
            ref: "Comment"
        }
    ]
}, {
    index: {
        findByEmail: {
            by: "email"
        }
    }
});

/**
 * Comment model
 */
var CommentModel = ottoman.model("Comment", {
    message: "string",
    timestamp: {
        type: "Date",
        default: function() {
            return new Date();
        }
    }
});

/**
 * Export models
 */
module.exports = {
    PersonModel,
    CommentModel
}