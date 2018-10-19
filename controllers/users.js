const express = require('express');
const router = express.Router();
const Users = require('../models/users');

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
//new
router.get('/new', async (req, res) => {
    try{
      const allUsers = await Users.find({});
      res.render('users/new.ejs',{
        Users:allUsers
      });
    } catch(err){
      res.send(err)
    }
});

router.post('/', async (req, res) => {
    try{
        const users = await Users.create(req.body);
        res.redirect('users/index.ejs')
    }catch(err){
        res.send(err);
    }
});

//show
router.get('/:id', async (req, res)=>{
    try{
      const foundUsers = await Users.findById(req.params.id);
      const foundReviews = await Reviews.findOne({'articles._id': req.params.id});
      res.render('reviews/show.ejs', {
            reviews: foundReviews,
            users: foundUsers
      });
    } catch(err){
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