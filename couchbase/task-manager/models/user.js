var ottoman = require("ottoman");
var validator = require("../validators/validators.js");
var CompanyMdl = require("./company.js");
var couchbase = require("couchbase");

var bucket = require("../app").bucket;
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

var UserMdl = ottoman.model("User", {
    createdON: {type: "Date", default:function(){return new Date()}},
    active: {type: "boolean", default: true},
    name: {
        first: "string",
        last: "string"
    },
    address: {
        street: "string",
        city: "string",
        state: "string",
        zip: "string",
        country: "string"
    },
    phone: {type:"string", default: validator.phoneValidator},
    email: "string",
    password: "string",
    company: {ref: "Company"}
}, {
    index: {
        findByEmail: {
            by: "email",
            type: "refdoc"
        },
        findByLastName: {
            by: "name.last",
            type: "n1ql"
        },
        findByCompany:{
            by:"company",
            type: "n1ql"
        }
    }
});

module.exports=UserMdl;
