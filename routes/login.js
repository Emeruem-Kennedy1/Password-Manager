const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const initializePassport = require('../auth/passportAuth');
const {checkAuthenticated, checkNotAuthenticated} = require('../auth/checkAuthenticated');




initializePassport(passport)


router.get('/',checkNotAuthenticated, (req, res) => {
    res.render('login');
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
    })
);

module.exports = router;