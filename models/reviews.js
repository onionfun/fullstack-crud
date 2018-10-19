const mongoose = require('mongoose');
const Users = require('../models/users');
const reviewSchema = new mongoose.Schema({
    username: {type:String, required: false},
    password: {type:String, required: false},
    users: [Users.schema]
  });
  
  module.exports = mongoose.model('Reviews', reviewSchema);