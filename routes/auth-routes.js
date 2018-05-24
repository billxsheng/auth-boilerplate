const router = require('express').Router();
const passport = require('passport');
const hbs = require('hbs');

//auth login
router.get('/signupredirect', (req, res) => {
    res.render('pre-signup');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
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