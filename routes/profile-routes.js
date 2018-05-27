const router = require('express').Router();
const hbs = require('hbs');
const querystring = require('querystring');
const url = require('url');    

// const authCheck = (req, res, next) => {
//     if(!req.user) {
//         res.redirect('/auth/login');
//     } else {
//         next();
//     }
// };

router.get('/', ensureAuthenticated, (req, res) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);
    res.render('profile', {
        firstName: query.fn,
        lastName: query.ln,
        email: query.email
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