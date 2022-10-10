const express = require('express');
const router = express.Router();
const axios = require('axios');
const {checkAuthenticated, checkNotAuthenticated} = require('../auth/checkAuthenticated');
const {findUsers, findUserDetails} = require('../auth/authentication');
const md5 = require('md5');


router.get('/',checkNotAuthenticated, (req, res) => {
    res.render('signup',{message: null});
})

router.post('/', async (req, res) => {
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

module.exports = router;


// Todo: write code to ensure that the password and the confirm password fields match
