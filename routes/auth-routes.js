const router = require('express').Router();
const passport = require('passport');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const User = require('../model/user-model');
var localStrategy = require('passport-local').Strategy;
var mongoose1 = require('../db/mongoose');

//body-parser stuff
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//auth login
router.get('/signupredirect', (req, res) => {
    res.render('signupredirect');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/signup/local', urlencodedParser, (req, res) => {
    if(req.body.firstName === "" || req.body.lastName === "") {
        res.render('signup', {
            error: "Please enter a valid name."
        });
    } else if (req.body.email === "") {
        res.render('signup', {
            error: "Please enter a valid email."
        });
    } else if (req.body.password === "") {
        res.render('signup', {
            error: "Please enter a valid password."
        });
    } else if(req.body.passwordConf === "") {
        res.render('signup', {
            error: "Please confirm your password."
        });
    } else if(req.body.password != req.body.passwordConf) {
        res.render('signup', {
            error: "Passwords do not match."
        });
    };
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName =req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    User.emailVeri(req.body.email).then(() => {
        console.log(1);
    }).catch(() => {
        return res.render('signup', {
            error: 'Email already in use.'
        })
    });

   
    User.createUser(user, (err, user) => {
        if(err) {
            throw err;
        }
        console.log(user);
    });
    user.save().then(() => {
        res.render('login');
    });
}); 

//google callback route
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

//auth with google
router.get('/google', passport.authenticate("google", {
    scope: ['profile']
}), (req, res) => {
    //handle with passport
    res.send('logging in with google');
});


module.exports = router;