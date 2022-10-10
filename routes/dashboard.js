const {fetch} = import('node-fetch');
const exppress = require('express');
const router = exppress.Router();
const {checkAuthenticated} = require('../auth/checkAuthenticated');


const findServices = async (emailID) =>{
    const url = `${process.env.API_ENTRYPOINT}/${process.env.API_KEY}/users/${emailID}/services`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

router.get('/', checkAuthenticated, async (req, res) => {
    const services = await findServices(req.user.email);

    res.render('dashboard', {services: services.data});

})

router.post('/', checkAuthenticated, async (req, res) => {
    const url = `${process.env.API_ENTRYPOINT}/${process.env.API_KEY}/users/${req.user.email}/services`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            serviceName: req.body.serviceName,
            username: req.body.username,
            password: req.body.password
        })
    });
    const data = await response.json();
    res.redirect('/dashboard');
})



module.exports = router;