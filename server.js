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
app.use((req, res, next)=> {
    res.locals.user = req.session.user;
    next();
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', usersController);
app.use('/reviews', reviewsController);
app.use('/auth', authController);
app.use('/users/:userId/reviews', (req, res, next)=>{
    req.userId=req.params.userId
    next()
}, reviewsController);

//landing
app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.listen(3000, ()=>{
    console.log('App LISTENING')
});