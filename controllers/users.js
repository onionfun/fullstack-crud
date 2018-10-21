const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const objectId = require('mongodb').ObjectID;

//index
router.get('/', async (req, res)=>{
    try{
        const allUsers = await Users.find();
        res.render('index.ejs', {
            users: allUsers
        })
    } catch(err){
        res.send(err)
    }
});

// router.post('/', async (req, res) => {
//     try{
//         const users = await Users.create(req.body);
//         res.redirect('users/index.ejs')
//     }catch(err){
//         res.send(err);
//     }
// });

//show
router.get('/:id', async (req, res)=>{
    try{
      const foundUsers = await Users.findById(req.params.id);
      const foundReviews = await Reviews.findOne({'reviews._id': req.params.id});
      res.render('users/show.ejs', {
            reviews: foundReviews,
            users: foundUsers
      });
    }
     catch(err){
         console.log('error message')
      res.send(err)
    }
});


// router.delete('/:id', async (req, res) => {
//     try{
//         const users = await Users.findById(req.params.id);
//         for (let i = 0; i < users.reviews.length; i++){
//             await Reviews.findByIdAndDelete(users.reviews[i]._id);
//         }
//         await Users.findByIdAndDelete(req.params.id)
//         res.redirect('/users')
//     }catch(err){
//         res.send(err);
//     }
// });



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