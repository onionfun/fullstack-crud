const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const usersController = require('./controllers/users.js');
const reviewsController = require('./controllers/reviews.js');
require('./db/db');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', usersController);
app.use('/reviews', reviewsController);

//landing
app.get('/', (req, res)=>{
    res.render('index.ejs');
});

app.listen(3000, ()=>{
    console.log('App LISTENINNNNNNNNNNNNNNNG')
});