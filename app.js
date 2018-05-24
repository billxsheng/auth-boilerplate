const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const hbs = require('hbs');


const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.cookie.session]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('mongo');
}).catch((e) => {
    console.log(e);
});

//set up view engine
app.set('view engine', 'hbs');

//setup routes
app.use('/auth', authRoutes);
app.use('/', profileRoutes);

//home route
app.get('/', (req, res) => {
    res.render("start");
});

app.get('/home', (req, res) => {
    res.render('home'); 
});


app.listen(3000, () => {
    console.log('app now up on port 3000');
});