const mongoose = require('mongoose');
//const Reviews = require('../models/reviews');
const userSchema = new mongoose.Schema({
  username: {type:String, required: true},
  password: {type:String, required: true},
  // reviews: [Reviews.schema]
  });
  
  module.exports = mongoose.model('Users', userSchema);