var ottoman = require("ottoman");
var validator = require("../validators/validators.js");
var couchbase = require("couchbase");

var bucket = require("../app").bucket;
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

//TODO: crear modellad de datos (CompanyMdl)
var CompanyMdl = ottoman.model("Company", {
    name: "string",
    address: {
        street: "string",
        city: "string",
        state: "string",
        zip: "string",
        country: "string"
    },
    phone: {type:"string", default: validator.phoneValidator},
    website: "string"
}, {
    index: {
        findByCompanyName: {
            by: "name",
            type: "n1ql"
        }
    }
});

module.exports=CompanyMdl;
