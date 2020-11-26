const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user.model');


router.get('/new/product', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.render('product/newproduct')
  }
});

router.post('/new/product', (req, res) => {
  console.log('Created new product');
  req.session.user._id
  Product.create({
    user: req.session.user._id,
    title: req.body.title,
    smallDescription: req.body.smallDescription,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    location: req.body.location,
  })
    .then(() => {
      res.redirect('/')
    })
})

router.get('/view/myproducts', (req, res, next) => {
  Product.find({user: req.session.user._id}).populate('product').then((arrProduct) => {
                  res.render('user/userpage', {myProducts: arrProduct})
             
          });
  })



module.exports = router;
