const exppress = require('express');
const router = exppress.Router();
const {checkAuthenticated} = require('../auth/checkAuthenticated');

services = []
router.get('/', checkAuthenticated, (req, res) => {
    res.render('dashboard',services);
})


module.exports = router;