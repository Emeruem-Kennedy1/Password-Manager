const exppress = require('express');
const bodyParser = require('body-parser');
const mongooose = require('mongoose');
const env = require('dotenv').config();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const {checkAuthenticated, checkNotAuthenticated} = require('./auth/checkAuthenticated');
const {fetch} = import('node-fetch');


const app = exppress();

// use static files from public folder (css, js, images)
app.use(exppress.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

////////////////Routes/////////////////////
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const dashboardRoutes = require('./routes/dashboard');


app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/dashboard', dashboardRoutes);


// make ejs the default view engine
app.set('view engine', 'ejs');


app.get('/',checkNotAuthenticated, (req, res) => {
    res.render('signup',{message: null});
})

app.delete('/logout', (req, res) => {
    req.logOut((err)=>{
        if(err) {return err};
        res.redirect('/login');
    })
})

const port = process.env.PORT || 8080;
app.listen (port, () => {
    console.log(`Server is listening on port ${port}`);
})