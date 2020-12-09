const express = require('express');
const router  = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// SIGN UP

router.get('/signup', (req, res, next) => {
  res.render('user/signup');
});

router.post('/signup', (req, res, next) => {
  // creates salt
  // 10 stands for the number of salt rounds
  const salt = bcrypt.genSaltSync(10);
  // bcrypt.hashSync() method receives two different parameters: the password we are going to encrypt and the value of previously generated salt
  const pwHash = bcrypt.hashSync(req.body.password, salt);
  // creates an object in the database
  User.create({ username: req.body.username, passwordHash: pwHash }).then(() => {
      res.redirect('user/login')
  });
});

// LOGIN

router.get('/login', (req, res) => {
  res.render('user/login')
})

router.post('/login', (req, res) => {
  console.log('SESSION =====> ', req.session); // req.session === {}

  // find the user by their username
  User.findOne({ username: req.body.username }).then((user) => {

    if (!user) {
      // this user does not exist
      res.render('/user/login', { errorMessage: 'username does not exist' })
    } else {

      // check if the password is correct
      if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = user
        res.redirect('/userpage')
      } else {
        res.render('/user/login', { errorMessage: 'password wrong' })
      }

    }

  })

})

// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
});

//Edit Profile

router.get('/:id/edit-profile', (req, res, next) => {
  console.log("user id",req.params.id);
  User.findById(req.params.id).then( user => {
    console.log("my user profile", user)
    res.render('user/edituser', { myUserDestails: user, user: user })
  })
});

router.post('/:id/update', (req, res) => {
  console.log("my data", req.body)
  User.findByIdAndUpdate(req.params.id, { 
    Name: req.body.Name,
    SecondName: req.body.SecondName,
    Address: req.body.Address,
    bio: req.body.bio,
    Email: req.body.Email,
    Phone: req.body.Phone,
    }).then(() => {
    res.redirect('/userpage')
  })
})

module.exports = router;