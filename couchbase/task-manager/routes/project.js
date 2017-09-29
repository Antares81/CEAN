var ProjectModel = require("../models/project");
var UserModel = require("../models/user");

var appRouter = function(app) {

    app.get("/api/project/link/:url",function(req,res){
        if(!req.params.url) {
            return res.status(400).send({"status": "error", "message": "invalid link"});
        }
        ProjectModel.findByLink(req.params.url,function(error,project){
            if(error) {
                return res.status(400).send(error);
            }
            res.send(project[0]);
        });
    });

    app.get("/api/project/get/:projectId", function(req, res) {
        if(!req.params.projectId) {
            return res.status(400).send({"status": "error", "message": "A project id is required"});
        }
        ProjectModel.getById(req.params.projectId, {load: ["users", "tasks"]}, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(project);
        });
    });

    //WARNING: atención al interrogante finial que indica que la llegada del param ownerId es opcional
    //y que hay que preveer tanto el escenario de que llgue como el de que no llegue
    app.get("/api/project/getAll/:ownerId?", function(req, res) {
        if(req.params.ownerId) {
            ProjectModel.findByOwner(UserModel.ref(req.params.ownerId), function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);
            });
        } else {
            ProjectModel.find({}, function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);
            });
        }
    });

    app.get("/api/project/getOther/:userId?", function(req, res) {
        if(req.params.userId) {
            ProjectModel.find({users: {$contains: UserModel.ref(req.params.userId)}}, {load: ["owner"]}, function(error, result) {
                if(error) {
                    return res.status(400).send(error);
                }
                res.send(result);
            });
        } else {
            ProjectModel.find({}, (error, models) => {
                if (error) {
                    return res.status(400).send(error);
                }
                res.send(models);
            });
        }
    });

    //crear un proyecto
    app.post("/api/project/create", function(req, res) {
        var project = new ProjectModel({
            "name": req.body.name,
            "description": req.body.description,
            "owner": req.body.owner,
            "users": req.body.users,
            "tasks": req.body.tasks,
            "status": req.body.status,
            "permalink":req.body.permalink
        });
        project.save(function(error, saved) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(saved);
        });
    });

    app.post("/api/project/addUser", function(req, res) {
        ProjectModel.getById(req.body.projectId, function(error, project) {
            if(error) {
                return res.status(400).send(error);
            }
            UserModel.find({email: req.body.email}, function(error, users) {
                if(error) {
                    return res.status(400).send(error);
                }
                if(users.length > 0) {
                    project.users.push(users[0]);
                    project.save(function(error) {
                        if(error) {
                            return res.status(400).send(error);
                        }
                        res.send(users[0]);
                    });
                } else {
                    return res.status(400).send({"status": "error", "message": "User does not exist"});
                }
            });
        });
    });

    app.get("/api/project/getUsers/:projectId", function(req, res) {
        if (!req.params.projectId) {
             return res.status(400).send({"status": "error", "message": "invalid project id"});
        }
        UserModel.findByCompany(req.params.projectId, (error, users) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.send(users);
        });
    });

};

module.exports = appRouter;
