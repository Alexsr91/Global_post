const express = require('express');
const router  = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


router.get('/signup', (req, res, next) => {
  res.render('user/signup');
});

module.exports = router;