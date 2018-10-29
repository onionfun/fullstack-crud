const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Reviews = require('../models/reviews')
const objectId = require('mongodb').ObjectID;
const requireLogin = require('../middleware/requireLogin');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//index
router.get('/', async (req, res)=>{
    try{
        const allUsers = await Users.find();
        res.render('users/index.ejs', {
            users: allUsers
        })
    } catch(err){
        res.send(err)
    }
});
//edit UN/PW
router.get('/:id/edit', async (req, res)=>{//requireLogin,
    try {
      const foundUser = await Users.findById(req.params.id);
      //const foundUser = await User.findById(req.session.username);
      console.log(foundUser);
      res.render('users/edit.ejs', {
        users: foundUser,
      });
  
    } catch (err){
        res.send(err)
    }
  });
  
  router.put('/:id', async (req, res)=>{//requireLogin,
   try {
    const updatedUser = await Users.findByIdAndUpdate(req.session.userId, {$set:req.body}, (err) =>{
        console.log(err);
    });
    console.log(updatedUser)
    req.session.userId = updatedUser._id;
    //console.log(req.session.username);
    res.redirect("/users/");
   } catch (err) {
       console.log("ERROR", err)
    res.send(err)
   }
  });
/* 
*/
//show
router.get('/:id', async (req, res)=>{
    try{
      const foundUsers = await Users.findById(req.params.id);
      const foundReviews = await Reviews.find({subject: foundUsers});
      res.render('users/show.ejs', {
           reviews: foundReviews,
            users: foundUsers
      });
    }
     catch(err){
         console.log('YA DUN MESSED UP')
         console.log(err)
      res.send(err)
    }
});

/*
from reviews 
router.get('/:id', async (req, res)=>{
    try{
      const foundUsers = await Users.findById(req.params.id);
      const foundReviews = await Reviews.findOne({'reviews._id': req.params.id});
      res.render('reviews/show.ejs', {
            reviews: foundReviews,
            users: foundUsers
      });
    } catch(err){
      res.send(err)
    }
})*/

//post route
router.post('/', async (req, res) => {
    try{
        const users = await Users.findById(req.body.userId);
        const review = await Reviews.create(req.body);
        users.reviews.push(review);
        await users.save();
        res.redirect('/users')
    }catch(err){
        console.log("ALERT")
        res.send(err);
    }
});



router.delete('/:id', async (req, res) => {
    try{
        const users = await Users.findById(req.params.id);
        for (let i = 0; i < users.length; i++){
            await Reviews.findByIdAndDelete(users[i]._id);
        }
        await Users.findByIdAndDelete(req.params.id)
        res.redirect('/users')
    }catch(err){
        res.send(err);
    }
});



module.exports = router;

//on reviews show page is your own reviews
//index page for seeing reviews
//new reviews is making a new review
//should be able to see all users and then click on them to write a review about them
//reviews/show should have all the users
//users INDEX Page is their page for viewing himself
//reviews index shows all other users
//reviews show is just one user
//list of users to review takes it to review show page
//on user and review model, review is connected to target of review and who's doing it, to show reviews 
//about a person, review.find(reviewee has the same id as the person who's logged in) do a quiery based on the field