const mongoose = require('mongoose');
//const Reviews = require('../models/reviews');
const userSchema = new mongoose.Schema({
  
  username: {type:String, required: false},
  password: {type:String, required: false},
  // reviews: [Reviews.schema]
  });
  
  module.exports = mongoose.model('Users', userSchema);