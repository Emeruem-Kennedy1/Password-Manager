import {Strategy as LocalStrategy} from 'passport-local';
import {findUsers, findUserDetails} from './authentication.js';
import bcrypt from 'bcrypt';
import md5 from 'md5'
import cookieParser from 'cookie-parser';



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


export default initialize