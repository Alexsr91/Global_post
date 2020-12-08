const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user.model');
const fileUploader = require('../configs/cloudinary.config');
const nodemailer = require('nodemailer');

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


/*




router.get('/sellerpage',(req, res) => {
  User.find(req.user.id).then(user => {
    console.log(user);
    res.render('sellerpage', {seller: user})
  })
})
*/

router.get('/sellerpage/:id',(req, res) => {
  User.findById(req.params.id).then(seller => {
    Product.find({ user: seller._id }).populate('user').then((sellerProduct) => {
    res.render('user/sellerpage', { theseller: seller, sellerProduct: sellerProduct })
    })
  })
})

//Filter

router.get('/filter',(req, res) => {
  let q = {}
  if (req.query.location !== "") {
    q.location = req.query.location
  }
  if (req.query.title !== "") {
    q.title = req.query.title
  }
  if (req.query.price !== ""){
    q.price = { $gte: req.query.price }
  }
  Product.find(q).populate('user').then((result) =>{
  console.log("this is the location", result);  
  res.render('product/filtered', { filterresult: result })
  })
  console.log("aaaaaaaaaaaaaaaaaaa", q);
})

router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sheshyam123@gmail.com',
      pass: 'christ927@'
    }
  });
  transporter.sendMail({
    to: email,
    subject: subject,
    text: message,
    html: `<b><h1>msg sent by : </h1>${message}</b>`
  })
    .then(info => res.render('message', { email, subject, message, info }))
    .catch(error => console.log(error));
});

router.get('/:id/seemore', (req, res, next) => {
  console.log(req.params.id)
  Product.findById(req.params.id).then((producFromDB) => {
    console.log(producFromDB)
    res.render('product/seemore', { product: producFromDB })


  })

});

module.exports = router;
