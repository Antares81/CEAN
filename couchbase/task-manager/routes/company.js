var CompanyModel = require("../models/company");

var appRouter = function(app) {

    app.get("/api/company/get/:companyId", function(req, res) {
        if (!req.params.companyId) {
             return res.status(400).send({"status": "error", "message": "invalid company id"});
        }
        CompanyModel.getById(req.params.companyId, (error, company) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(company);
        });
    });

    app.get("/api/company/getAll", function(req, res) {
        CompanyModel.find({}, (error, companys) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(companys);
        });
    });

    app.post("/api/company/create", function(req, res) {
        //TODO: crear modelo según esquema (no hace falta incluir los valores informados por defecto)
        var company = new CompanyModel({
            "name": req.body.name,
            "address": {
                "street": req.body.address.street,
                "city": req.body.address.city,
                "state": req.body.address.state,
                "zip": req.body.address.zip,
                "country": req.body.address.country
            },
            "phone": req.body.phone,
            "website": req.body.website
        });
        company.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(req.body);
        });
    });

};

module.exports = appRouter;
