const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Reviews = require('../models/reviews');
const objectId = require('mongodb').ObjectID;
const methodOverride = require('method-override');

//routes
//index
router.get('/',async (req, res) => {
    try{
        const foundUser = await Users.find({});
        const loggedIn = await Users.findOne({'users._id': req.params.id});
        res.render('reviews/index.ejs', {
            users: foundUser,
            currentUser: loggedIn
        })
    } catch(err){
        res.send(err)
    }
})

// new review
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
// router.get('/:id', async (req, res)=>{
//     try{
//       const foundUsers = await Users.findById(req.params.id);
//       const foundReviews = await Reviews.findOne({'reviews._id': req.params.id});
//       res.render('reviews/show.ejs', {
//             reviews: foundReviews,
//             users: foundUsers
//       });
//     } catch(err){
//       res.send(err)
//     }
// })
router.get('/:id/edit', async (req, res)=>{
  try {
    const foundReview = await Reviews.find(req.params.text);
    console.log(foundReview);
    res.render('reviews/edit.ejs', {
      review: foundReview,
    });

  } catch (err){
      res.send(err)
  }
});


router.put('/:id', async (req, res)=>{
 try {
  await Reviews.findOneAndUpdate(req.params.id, req.body);
  res.redirect('/reviews');
 } catch (err) {
  res.send(err)
 }
 
});
//edit
// router.get('/:id/edit', async (req, res)=>{
//   try{
//       allUser = await Users.find({})
//        foundReviewsUsers = await Users.findOne({'reviews._id': req.params.id})
//        foundReview = await Reviews.findById(req.params.id);
//        console.log(foundReview);
//         res.render('reviews/edit.ejs', {
//          //+foundUser._id)              req.session.userId = foundUser._id;
//              // res.redirect('/users/'+foundUser._id)
//               reviews: foundReview,
//               users: allUser,
//               reviewUsers: foundReviewsUsers
//           }) 
//         }catch(err){
//          res.send(err)
//         }
// });

// //all the reviews written by the user logged in currently
// router.put('/:id', async (req, res)=>{
//    try {
//     await Reviews.findOneAndUpdate(req.params.id, req.body);
//     res.redirect('/reviews');
//    } catch (err) {
//     res.send(err)
//    }
   
//   });

//post create
router.post('/', async (req, res)=>{
  try{
  const foundSubject = await Users.findById(req.body.subject);
  const foundReviewer = await Users.findById(req.session.userId);
  const reviewCreated = {
    text: req.body.text,
    rating: req.body.rating,
    reviewer: foundReviewer,
    subject: foundSubject
  };
  await Reviews.create(reviewCreated);
  res.redirect('/reviews')
  }catch(err){
  res.send(err)
}
});

//usermodel has array of reviews about them
//ON SHOW EJS .get /new => reviews/new.ejs, {pass in users: reviewschema.find({})}
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
/*
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
*/
  module.exports = router;