import express  from 'express';
const router = express.Router();
import axios  from 'axios';
import {checkAuthenticated, checkNotAuthenticated}  from '../auth/checkAuthenticated.js';
import {findUsers, findUserDetails} from '../auth/authentication.js';
import md5  from 'md5';
import fetch from 'node-fetch';

router.get('/',checkNotAuthenticated, (req, res) => {
    res.render('signup',{message: null});
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    const url = `${process.env.API_ENTRYPOINT}/${process.env.API_KEY}/users`;
    const user= {
        email: req.body.email,
        password: req.body.password,
        username : `${req.body.firstName} ${req.body.lastName}`
    }
    const config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {...user}
    };
    const users = await findUsers();
    const userEmailId = users.data.find(userEmailid => userEmailid === md5(user.email));
    // check if the email address already exists in the database
    if (userEmailId == null) {
        try {
            const response = await axios(config);
            res.redirect('/login');
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.render('signup',{message: 'Email address already exists'});
    }

})

export default router;


// Todo: write code to ensure that the password and the confirm password fields match
