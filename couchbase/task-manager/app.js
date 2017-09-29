var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var ottoman = require("ottoman");
var path = require("path");
var config = require("./config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global declaration of the Couchbase server and bucket to be used
module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket, (error) => {
    if (error) {
        console.log(`error de apertura ${error}`);
    }
});
app.use("/cdn",express.static(path.join(__dirname, "cdn")));
app.use(express.static(path.join(__dirname, "public")));
//app.use("/node_modules", express.static(__dirname + "/node_modules/"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//TODO: Establecer todos los 'end points' del API (company, project, etc...)
var cdnRouter = require('./routes/cdn')(app);
var companyRouter = require('./routes/company')(app);
var projectRouter = require('./routes/project')(app);
var taskRouter = require('./routes/task')(app);
var userRouter = require('./routes/user')(app);

//ottoman.bucket = module.exports.bucket;
ottoman.store = new ottoman.CbStoreAdapter(module.exports.bucket, couchbase);

var UserModel = require("./models/user");
var CompanyModel = require("./models/company");

ottoman.ensureIndices(function(error) {
    if(error) {
        console.log(error);
    }
    //TODO: 
    //1.- buscar el documento que tiene como valor 'Couchbase' en el atributo name
    //PISTA: crear un índice sobre ese atributo y asociar a él la función findByCompanyName 
    CompanyModel.findByCompanyName('Couchbase', (error, result) => {
        if (error) {
            console.log(error);
            return error;
        }
        if (result.length == 0) {
        //2.- si no existe, crearla invocando al método createDefaultCompany
            createDefaultCompany().then((company) => {
                company.save((error, result) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
            }).catch((error) => {
                console.log(error);
            });
        } 
        //3.- si existe, poner a escuchar al server e el puerto 3000
        app.listen(3000, (error) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log(`Servidor escuchando el puerto 3000`);
        });
    });

});

var createDefaultCompany = function() {
    return new Promise(function(resolve, reject) {
        var company = new CompanyModel({
            name: "Couchbase",
            address: {
                street: "2440 West El Camino Real",
                city: "Mountain View",
                state: "CA",
                zip: "94040",
                country: "USA"
            },
            phone: "1234567890",
            website: "https://www.couchbase.com"
        });
        company.save(function(error) {
            if(error) {
                reject(error);
            }
            resolve(company);
        });
    });
}