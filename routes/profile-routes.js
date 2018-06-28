const router = require('express').Router();
const url = require('url');    


router.get('/', ensureAuthenticated,  (req, res) => {
    res.render('profile', {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.render('login', {
            error:"You are not logged in."
        })
    }
}

module.exports = router;