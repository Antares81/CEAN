/**
 * Requires zone
 */
var express = require('express');
var bodyParser = require('body-parser');
//var path = require('path');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local');

var app = express();

//setup passport
/**
 * Setting up the passport component
 */
passport.use(new LocalStrategy((username, password, done) => {
    if (username !== 'gustavo' || password !== '123456') {
        return done(null, false);
    } else {
        return done(null, {username:username});
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

/**
 * Setting up the express session
 */
app.use(session({
    secret:'Frase secreta',
    resave:false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

/**
 * Decision structure with autentication use
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next next action
 */
var requireAuthentication = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}

/**
 * Setting up the engine template
 */
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(path.join(__dirname,`public`)));

/**
 * Setting up the server
 */
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express escuchando sobre el puerto ${port}`)
});

/**
 * First redirection
 */
app.get('/', (req, res) => {
    res.render('login', {
        title:'Login'
    });
});

/**
 * Login the user without passport and using post verb
 */
/*app.post('/login', (req, res) => {
    let user = req.body.username;
    let pass = req.body.password;

    res.render('profile', {
        title:`Perfil del usuario ${user}`
    });
});*/

/**
 * Loggin the user using passport and post verb
 */
app.post('/login', passport.authenticate('local', {
    successRedirect:'/profile',
    failureRedirect:'/'
}));

/**
 * Showing the user profile without security
 */
/*app.get('/profile', (req, res) => {
    res.render('profile', {
        title:'Perfil del usuario'
    });
});*/

/**
 * Showing the user profile with passport security
 */
app.get('/profile', [requireAuthentication, (req, res) => {
    res.render('profile', {
        title:'Perfil del usuario'
    });
}]);

/**
 * Loggin out the user using passport security
 */
app.get('/logout', [requireAuthentication, (req, res) => {
    req.logOut();
    res.redirect('/');
}]);