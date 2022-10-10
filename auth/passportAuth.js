const LocalStrategy = require('passport-local').Strategy
const {findUsers, findUserDetails} = require('./authentication.js');
const bcrypt = require('bcrypt')
const md5 = require('md5');
const cookieParser = require('cookie-parser');



function initialize(passport) {

    const authenticateUser = async (emailId, password, done) => {
        const usersEmailId = await findUsers();
        const userEmailId = usersEmailId.data.find(userEmailid => userEmailid === md5(emailId));

        if (userEmailId == null) {
            return done(null, false, {message: 'Incorrect email address'});
        }

        try {
            const user = await findUserDetails(userEmailId);
            bcrypt.compare(password, user.data.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    // cookieParser('user',user.data);
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Password incorrect'});
                }
            })
        }
        catch (error) {
            return done(error);
        }

    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.data.email);
    })
    passport.deserializeUser(async (emailId, done) => {
        const response = await findUserDetails(emailId)
        const user = await response.data;
        done(null, user);
    })
}


module.exports = initialize