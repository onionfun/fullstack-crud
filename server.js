const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const usersController = require('./controllers/users.js');
const reviewsController = require('./controllers/reviews.js');
const authController     = require('./controllers/auth');
const session        = require('express-session');
const morgan = require('morgan');
const requireLogin = require('./middleware/requireLogin')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
  collection: 'mySessions'
});

require('./db/db');

//middleware
app.use(morgan('short'));
app.use(session({
    secret: 'Keep it secret, keep it safe.',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
  }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', usersController);
app.use('/reviews', reviewsController);
app.use('/auth', authController);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

app.use((req, res, next)=> {
  res.locals.userId = req.session.userId;
  next();
});
 
store.on('connected', function() {
  store.client; // The underlying MongoClient object from the MongoDB driver
});
 
// Catch errors
store.on('error', function(error) {
  //assert.ifError(error);
  //assert.ok(false);
  console.log(error)
});
 
 
//app.get('/', function(req, res) {
 // res.send('Hello ' + JSON.stringify(req.session));
//});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//app.use(session())
//app.use(async(req,res, next)=>{
   // res.locals.user=req.ession.user || {}; //says we have local constiable in the template
//next()
   //})
   //router.get('/', async(req, res)=>{try{const posts = await post.find({}).populate('author');
   //res.locals.posts=posts; < wouldn't need to pass posts obejct after index.ejs
//res.render('posts/index.ejs', {
 //   posts: posts
//})
// }catch(err)}
// res.send(err))
// ====
//requireLogin = require('./requireLogin.js')
//reouter.get('/new', requireLogin,(req,res)=>{
//     res.render(posts/new.ejs);
// })
//in requireLogin.js
// module.exports=function(req,res,next){
//     if(!req.session.userId){
//         req.session.message="log in";
//         res.redirection("/auth/login");
//     }else{
//         next();
//     }
// }
//landing
app.get('/', (req, res)=>{
    res.render('index.ejs');
});
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('App LISTENING')
});
//in the reviews schema .populate(the name of the user) attribute based on review id