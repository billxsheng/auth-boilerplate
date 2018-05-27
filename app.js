const express = require('express');
const profileRoutes = require('./routes/profile-routes');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./db/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const hbs = require('hbs');
const path = require('path');
const User = require('./model/user-model');
const bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');

//express app
const app = express();

//body-parser stuff
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//deploy 
const port = process.env.PORT || 3000

//getting statics
app.use(express.static(path.join(__dirname, '/views')));

//cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.cookie.session]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up view engine
app.set('view engine', 'hbs');

//setup routes
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);

//route to first page
app.get('/', (req, res) => {
    res.render("start");
});

//login page route
app.get('/login', (req, res) => {
    res.render('login'); 
});

// app.get('/profile', (req, res) => {
//     res.render('profile', {
//         email: req.body.email,
//         firstName: req.user.firstName,
//         lastName: req.user.lastName
//     }); 
// });

//serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  

//deserialize 
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });



//passport middleware
passport.use('local-login', new LocalStrategy({
    usernameField: "email", passwordField: "password", passReqToCallback: true
},
    function(req, username, password, done) {
        User.findByCredentials(req.body.email, req.body.password).then((user) => {
                    if(user) {
                        done(null, user);
                    }
                    }).catch(() => {
                        done(null, false);
                    });
    }
));

//Login POST 

app.post('/profile', [urlencodedParser,
  passport.authenticate('local-login')],
  function(req, res) {
    res.render('profile', {
        email: req.body.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    });
  });


app.listen(port, () => {
    console.log(`app now up on port ${port}`);
});