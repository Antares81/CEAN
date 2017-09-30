var express = require('express');

var app = express();

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor Express escuchando sobre el puerto ${port}`)
});

let recetas = [];
app.get('/getRecipes', (req, res) => {
    recetas = [
        {
            "name": "Hojaldre al limón",
            "preparacion": "Cocinar masa de hojaldre",
            "imagen": "",
            "dificultad": 0,
            "ingredientes": [
                {"name": "Hojaldre", "price": 5},
                {"name": "Limon", "price": 8}
            ]
        },
        {
            "name": "Pizza con grelos",
            "preparacion": "Cocinar pizza con grelos",
            "imagen": "",
            "dificultad": 1,
            "ingredientes": [
                {"name": "Pizza", "price": 10},
                {"name": "Grelos", "price": 3}
            ]
        },
        {
            "name": "Pizza con pulpo",
            "preparacion": "Cocinar pizza con pulpo",
            "imagen": "",
            "dificultad": 2,
            "ingredientes": [
                {"name": "Pizza", "price": 10},
                {"name": "Pulpo", "price": 21}
            ]
        }
    ];

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(recetas);
});


app.post('/addRecipe', (req, res) => {
    console.log("entra");
    let recipe = {
        "name": req.body.name,
        "preparacion": req.body.name.preparacion,
        "imagen": req.body.imagen,
        "dificultad": req.body.dificultad,
        "ingredientes": [
            {"name": req.body.ingredientes.name, "price": req.body.ingredientes.price},
            {"name": req.body.ingredientes.name, "price": req.body.ingredientes.price}
        ]
    };
    recetas.push(recipe);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log("sale");
    res.send('ACK');
});