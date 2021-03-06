var TaskModel = require("../models/task");
var ProjectModel = require("../models/project");
var UserModel = require("../models/user");

var appRouter = function(app) {

    app.get("/api/task/link/:url",function(req,res){
        if(!req.params.url) {
            return res.status(400).send({"status": "error", "message": "invalid link"});
        }
        TaskModel.findByLink(req.params.url, {load: ["users", "assignedTo", "history[*].user"]}, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            ProjectModel.find({tasks: {$contains: task[0]}}, function(error, projects) {
                if(error) {
                    return res.status(400).send(error);
                }
                if(projects.length > 0) {
                    res.send({projectId: projects[0]._id, task: task[0]});
                } else {
                    res.status(400).send({"status": "error", "message": "Project not found"});
                }
            });
        });
      });

    app.get("/api/task/get/:taskId", function(req, res) {
        if(!req.params.taskId) {
            return res.status(400).send({"status": "error", "message": "A task id is required"});
        }
        TaskModel.getById(req.params.taskId, {load: ["users", "assignedTo", "history[*].user"]}, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            ProjectModel.find({tasks: {$contains: task}}, function(error, projects) {
                if(error) {
                    return res.status(400).send(error);
                }
                if(projects.length > 0) {
                    res.send({projectId: projects[0]._id, task: task});
                } else {
                    res.status(400).send({"status": "error", "message": "Project not found"});
                }
            });
        });
    });

    app.get("/api/task/getAssignedTo/:userId", function(req, res) {
        if(!req.params.userId) {
            return res.status(400).send({"status": "error", "message": "A user id is required"});
        }
        TaskModel.findByAssignedTo(req.params.userId, {load: ["owner"]}, function(error, tasks) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(tasks);
        });
    });

    /*
     * Create a new task document and push a reference to the matching project document
     */
    app.post("/api/task/create/:projectId", function(req, res) {
        var task = new TaskModel({
            name: req.body.name,
            description: req.body.description,
            owner: UserModel.ref(req.body.owner),
            assignedTo: UserModel.ref(req.body.assignedTo),
            users: [UserModel.ref(req.body.owner)]
        });
        task.save(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            ProjectModel.getById(req.params.projectId, function(error, project) {
                if(error) {
                    return res.status(400).send(error);
                }
                project.tasks.push(task);
                project.save(function(error, result) {
                    if(error) {
                        return res.status(400).send(error);
                    }
                    res.send(task);
                });
            });
        });
    });

    app.post("/api/task/addUser", function(req, res) {
        //TODO: asociar un usuario a una tarea...
        
        //1.- buscar tarea (task) x key
        TaskModel.getById(req.body.taskId, (error, task) => {
            if (error) {
                return res.status(400).send(error);
            }
            if (task.length > 0) {
                //2.- si ok, buscar usuario a asociar por campo email (find con filtro)
                UserModel.findByEmail(req.body.email, (error, user) => {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    if (user.length > 0) {
                        //3.- si ok, asociar a la lista de usuarios de la tarea hallada en 1 este usuario
                        task.users.push(user);
                        //4.- Actualizar tarea (save)
                        task.save((error, taskSaved) => {
                            if (error) {
                                return res.status(400).send(error);
                            }
                            //5.- devolver usuario
                            req.send(user);
                        })
                    }
                });
            }
        })
        //para todos los casos, control de errores...  
        
    });

    app.post("/api/task/assignUser", function(req, res) {
        TaskModel.getById(req.body.taskId, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            UserModel.getById(req.body.userId, function(error, user) {
                if(error) {
                    return res.status(400).send(error);
                }
                task.assignedTo = user;
                task.save(function(error) {
                    if(error) {
                        return res.status(400).send(error);
                    }
                    res.send(user);
                });
            });
        });
    });

    app.post("/api/task/addHistory", function(req, res) {
        TaskModel.getById(req.body.taskId, function(error, task) {
            if(error) {
                return res.status(400).send(error);
            }
            var history = {
                log: req.body.log,
                user: UserModel.ref(req.body.userId),
                createdAt: (new Date())
            }
            task.history.push(history);
            task.save(function(error) {
                if(error) {
                    return res.status(400).send(error);
                }
                UserModel.getById(req.body.userId, function(error, user) {
                    if(error) {
                        return res.status(400).send(error);
                    }
                    res.send({log: req.body.log, user: user, createdAt: history.createdAt});
                });
            });
        });
    });

    app.post("/api/task/addPhoto", function(req,res){
        TaskModel.getById(req.body.taskId,function(error,task){
            if(error){
                return res.status(400).send(error);
            }
            var history = {
                user: UserModel.ref(req.body.userId),
                createdAt: (new Date()),
                photos:[req.body.imageId]
            }
            task.save(function(error) {
                if (error) {
                    return res.status(400).send(error);
                }
                UserModel.getById(req.body.userId, function(error, user) {
                    if(error) {
                        return res.status(400).send(error);
                    }
                    res.send({log: req.body.log, user: user, createdAt: history.createdAt, photos:[req.body.imageId]});
                });
            });
        });
    });

};

module.exports = appRouter;
