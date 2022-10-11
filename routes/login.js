import express from 'express';
const router = express.Router();
import passport from 'passport';
import initializePassport from '../auth/passportAuth.js';
import {checkAuthenticated, checkNotAuthenticated} from '../auth/checkAuthenticated.js';




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
export default router;
