const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Reviews = require('../models/reviews');


//routes
//index
router.get('/',async (req, res) => {
    try{
        const foundUser = await Users.find({});
        const currentUser = await Users.findById(req.session.userId)
        res.render('reviews/index.ejs', {
            users: foundUser,
            user: currentUser,
        })
    } catch(err){
        res.send(err)
    }
})

//that new new
router.get('/new', async (req, res) => {
    try{
      const allUsers = await Users.find({});
      res.render('reviews/new.ejs',{
        users:allUsers
      });
    } catch(err){
      res.send(err)
    }
})
//show
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
})
//edit
router.get('/:id/edit', (req, res)=>{
    Reviews.findById(req.params.id, (err, foundReviews) => {
      Users.find({}, (err, allUsers) => {
        Users.findOne({'reviews._id': req.params.id}, (err, foundReviewsUsers) => {
            res.render('reviews/edit.ejs', {
              reviews: foundReviews,
              users: allUser,
              reviewUsers: foundReviewsUsers
            });
        });
      });
    });
});
//post
router.post('/', (req, res)=>{
    User.findById(req.body.UserId, (err, foundUsers) => {
      Reviews.create(req.body, (err, createdReviews) => {
        foundUsers.reviews.push(createdReviews);
        foundUsers.save((err, data) => {
          res.redirect('/reviews')
        });
      });
    });
});
//delete
router.delete('/:id', (req, res)=>{
    Reviews.findByIdAndRemove(req.params.id, (err, deletedReviews)=>{ 
    Users.findOne({'reviews._id': req.params.id}, (err, foundUsers) => {
        foundUsers.reviews.id(req.params.id).remove();
        foundUsers.save((err, data) => {
           res.redirect('/reviews');
        });
      })
    });
});
//put
router.put('/:id', (req, res)=>{
    Article.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, updatedArticle)=>{
      Author.findOne({'articles._id': req.params.id}, (err, foundAuthor) => {
        if(foundAuthor._id.toString() !== req.body.authorId){
          foundAuthor.articles.id(req.params.id).remove()
          foundAuthor.save((err, savedFoundAuthor) => {
            Author.findById(req.body.authorId, (err, newAuthor) => {
              newAuthor.articles.push(updatedArticle);
              newAuthor.save((err, savedNewAuthor) => {
                res.redirect('/articles');
              });
            });
          });
        } else {
            foundAuthor.articles.id(req.params.id).remove();
            foundAuthor.articles.push(updatedArticle);
            foundAuthor.save((err, data) => {
              res.redirect('/articles');
            });
        } 
      });
    });
  });

  module.exports = router;