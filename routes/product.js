const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user.model');
const fileUploader = require('../configs/cloudinary.config');


router.get('/new/product', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.render('product/newproduct')
  }
});

router.post('/new/product', fileUploader.single('image'), (req, res) => {
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
    imageUrl: req.file.path,
  })
    .then(() => {
      res.redirect('/')
    })
})

router.get('/userpage', (req, res, next) => {
  Product.find({ user: req.session.user._id }).populate('user').then((arrProduct) => {
    if (arrProduct.length === 0) {
      User.findById(req.session.user._id).then(userInfo => {
        console.log("userInfo", userInfo)
        res.render('user/userpage', { myProducts: [], user: userInfo })
      })
    } else {
      console.log("aaaaaaaaaaaaa", arrProduct[0].user);
      res.render('user/userpage', { myProducts: arrProduct, user: arrProduct[0].user })
    }

  });
})

router.post('/:id/delete', (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/userpage')
  })
})

//Edit Product

router.get('/:id/edit', (req, res, next) => {
  console.log(req.params.id);
  Product.findById(req.params.id).then(product => {
    console.log("my product", product)
    res.render('product/edit', { myProduct: product })
  })
});

router.post('/:id/update', (req, res) => {
  console.log("my data", req.body)
  Product.findByIdAndUpdate(req.params.id, { 
    title: req.body.title,
    smallDescription: req.body.smallDescription,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    location: req.body.location,
    }).then(() => {
    res.redirect('/userpage')
  })
})





module.exports = router;
