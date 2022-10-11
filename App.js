import exppress from 'express';
import bodyParser from 'body-parser'
import mongooose from 'mongoose'
import  env from 'dotenv'
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import  methodOverride from 'method-override';
import {checkAuthenticated, checkNotAuthenticated} from './auth/checkAuthenticated.js';
import fetch from 'node-fetch';

env.config();

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
import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signup.js';
import dashboardRoutes from './routes/dashboard.js';


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