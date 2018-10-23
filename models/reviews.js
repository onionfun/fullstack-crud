const mongoose = require('mongoose');
const Users = require('../models/users');
const reviewSchema = new mongoose.Schema({
    username: String,
    password: String,
    users: [Users.schema]
  });
  
  module.exports = mongoose.model('Reviews', reviewSchema);
  
  /*for loop over users <option value="user.id" end loop</select
re.body{user: id of revieweetext: req.body.textarea
dbquery={reviewer: currently logged in user
reviewee : user being reviewed using the id from the form
text: req.body}
dbquery={review.create(dbquery}}
reviewer: User.schema
 and reviewee user.schema*/