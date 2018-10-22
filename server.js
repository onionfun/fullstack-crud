const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const usersController = require('./controllers/users.js');
const reviewsController = require('./controllers/reviews.js');
const authController     = require('./controllers/auth');
const session        = require('express-session');

require('./db/db');

//middleware
app.use(session({
    secret: 'This is some random secret string',
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', usersController);
app.use('/reviews', reviewsController);
app.use('/auth', authController);


//landing
app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.listen(3000, ()=>{
    console.log('App LISTENINNNNNNNNNNNNNNNG')
});