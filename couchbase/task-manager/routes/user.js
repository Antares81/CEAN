var bcrypt = require("bcryptjs");
var UserModel = require("../models/user");
var CompanyModel = require("../models/company");

var appRouter = function(app) {

    app.get("/api/user/get/:userId", function(req, res) {
        if (!req.params.userId) {
             return res.status(400).send({"status": "error", "message": "invalid user id"});
        }
        UserModel.getById(req.params.userId, {load:["company"]}, (error, user) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(user);
        });
    });

    app.get("/api/user/getAll", function(req, res) {
        UserModel.find({}, {load:["company"]}, (error, users) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(users);
        });
    });

    app.get("/api/user/login/:email/:password", function(req, res) {
        if(!req.params.email) {
            return res.status(400).send({"status": "error", "message": "An email is required"});
        } else if(!req.params.password) {
            return res.status(400).send({"status": "error", "message": "A password is required"});
        }
        UserModel.findByEmail(req.params.email, function(error, users) {
            if(error) {
                return res.status(400).send(error);
            }
            if(users.length > 0) {
                if(bcrypt.compareSync(req.params.password, users[0].password)) {
                    res.send(users[0]);
                } else {
                    res.status(400).send({"status": "error", "message": "Password is invalid"});
                }
            } else {
                res.status(400).send({"status": "error", "message": "Email does not exist"});
            }
        });
    });

    app.post("/api/user/create", function(req, res) {
        var user = new UserModel({
            "name": {
                "first": req.body.name.first,
                "last": req.body.name.last
            },
            "address": {
                "street": req.body.address.street,
                "city": req.body.address.city,
                "state": req.body.address.state,
                "zip": req.body.address.zip,
                "country": req.body.address.country
            },
            "phone": req.body.phone,
            "email": req.body.email,
            "password": bcrypt.hashSync(req.body.password, 10),
            "company": CompanyModel.ref(req.body.company)
        });
        //TODO: crea usuario asociando antes de devolución la compañía a la que pertenece
        user.save(function(error, saved) {
            if(error) {
                return res.status(400).send(error);
            }
            CompanyModel.getById(req.body.company, (error, company) => {
                if(error) {
                    return res.status(400).send(error);
                }
                user.company = company;
                res.send(user);
            });
        });
    });

};

module.exports = appRouter;
