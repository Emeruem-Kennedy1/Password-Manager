const exppress = require('express');
const bodyParser = require('body-parser');

const app = exppress();

app.use(exppress.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
// make ejs the default view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('signup');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})
app.post('/signup', (req, res) => {
    console.log(req.body);
    res.render('dashboard');
})

app.post('/login', (req, res) => {
    console.log(req.body);
    res.render('dashboard');
})



const port = process.env.PORT || 3000;
app.listen (port, () => {
    console.log(`Server is listening on port ${port}`);
})