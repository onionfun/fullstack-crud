const express = require('express');
const router  = express.Router();
const User    = require('../models/users');
const bcrypt  = require('bcryptjs');

//login
router.get('/login', (req, res) => {
  res.render('auth/auth.ejs', {
    message: req.session.message
  });
});
//register
router.post('/register', async (req, res) => {
    console.log(req.body)
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(2));
  console.log(`${passwordHash} is hash, ${password} is password`)

  const userEntry = {};
  userEntry.username = req.body.username;
  userEntry.password = passwordHash;

  const user = await User.create(userEntry);
  console.log(`the user info is ${user}`);
  req.session.logged   = true;
  req.session.message  = '';
  res.redirect('/auth/login');
});

//login
router.post('/login', async (req, res) => {
  try {
          const foundUser = await User.findOne({username: req.body.username});
          console.log(foundUser)
          if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
              req.session.logged = true;
              req.session.userId = foundUser._id
              res.redirect('/reviews')
            } else {
              req.session.message = 'Username or Password is Wrong';
              res.redirect('/auth/login')
            }
        } else {
              req.session.message = 'Username or Password is Wrong';
              res.redirect('/auth/login')
            } 
    } catch(err) {
    res.send('error')
  }
}); 
//logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      console.log('logout succesful')
      res.redirect('/')
    }
  });
});

module.exports = router;
