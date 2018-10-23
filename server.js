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
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/users', usersController);
app.use('/reviews', reviewsController);
app.use('/auth', authController);
//app.use(session())
//app.use(async(req,res, next)=>{
   // res.locals.user=req.ession.user || {}; //says we have local variable in the template
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

app.listen(3000, ()=>{
    console.log('App LISTENING')
});
//in the reviews schema .populate(the name of the user) attribute based on review id