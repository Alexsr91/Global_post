const express = require('express');
const router  = express.Router();
const Product = require('../models/product');

/* GET home page */
router.get('/', (req, res, next) => {
  Product.find().populate('user').then((arrProduct) => {
    console.log(arrProduct);
      res.render('index', { allProducts: arrProduct })
  })
});

module.exports = router;

