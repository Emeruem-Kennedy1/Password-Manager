const exppress = require('express');
const bodyParser = require('body-parser');
const mongooose = require('mongoose');

const app = exppress();

// use static files from public folder (css, js, images)
app.use(exppress.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

////////////////Routes/////////////////////
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);


// make ejs the default view engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('signup');
})


const port = process.env.PORT || 3000;
app.listen (port, () => {
    console.log(`Server is listening on port ${port}`);
})