const mongoose = require('mongoose');
const Users = require('../models/users');
const reviewSchema = new mongoose.Schema({
    // review: String,
    reviews: [{type:mongoose.Schema.Types.ObjectId, ref: 'Users'}]
  });
  module.exports = mongoose.model('Reviews', reviewSchema);