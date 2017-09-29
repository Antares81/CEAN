/**
 * Requires zone
 */
var uuid = require ('uuid'),
    bucket = require('./app').bucket,
    N1qlQuery = require('couchbase').N1qlQuery;

/**
 * Object person
 */
function PersonModel() {};

/**
 * Get all persons with nikel
 */
PersonModel.getAll = function (callback) {
    var statement = `SELECT META(person).id, person.name, person.email, 
                    (
                        SELECT timestamp, comment 
                        FROM ${bucket._name} 
                        USE KEYS person.comments
                    ) AS comments
                    FROM ${bucket._name} AS person 
                    WHERE person.type = 'person'`;
    var query = N1qlQuery.fromString(statement);
    bucket.query(query, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

/**
 * Get person by ID 
 */
PersonModel.getById = function (data, callback) {
    bucket.get(data.id, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result.value);
    });
};

/**
 * Save new person
 */
PersonModel.save = function (data, callback) {
    var person = {
        name: {
            first: data.name.first,
            last: data.name.last
        },
        email: data.email,
        comments: data.comments,
        type: 'person',
        timestamp: (new Date())
    };

    var id = data.id ? data.id : uuid.v4();

    bucket.upsert(id, person, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, result.value);
    });
};

/**
 * Object comment
 */
function CommentModel() {};

/**
 * New comment
 */
CommentModel.create = function (data, callback) {
    var comment = {
        comment: data.comment,
        type: 'comment',
        timestamp: (new Date())
    };
    
    var id = uuid.v4();
    bucket.insert(id, comment, (error, result) => {
        if (error) {
            return callback(error, null);
        }
        comment.id = id;
        callback(null, comment);
    });
}

/**
 * Export person and 
 */
module.exports = { 
    PersonModel,
    CommentModel
};