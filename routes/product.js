var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Product = require('../models/Product');

router.get('/', isAuthenticated, function(req, res) {
    Product.find({ seller: req.session.passport.user }).populate('tax').exec(function(err, products) {
        if (err)
          res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error getting products" });
        else res.json(products);
    });
});

router.get('/search/:query', function(req, res) {
  var regex = new RegExp(req.params.query, "i");
  Product.find({
    seller: req.session.passport.user,
    reference: regex
  }, function(err, products) {
    if (err) res.json({ SERVER_RESPONSE: 0 });
    else res.json(products);
  });
});

router.get('/get/:product_id', isAuthenticated, function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_RESPONSE: "Error loading products" });
        else {
          product.populate('tax', function(err, product) {
            if (err)
              res.json({ SERVER_RESPONSE: 5, SERVER_MESSAGE: "Error populating product" });
            else res.json(product);
          });
        }
    });
});

router.get('/check_reference/:reference', isAuthenticated, function(req, res) {
  Product.findOne({ reference: req.params.reference, seller: req.session.passport.user }, function(err, product) {
    if (err)
      res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE:"There was an error" });
    else if (product == null)
      res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "No product found" });
    else res.json({ SERVER_RESPONSE: 3, SERVER_MESSAGE: "This reference is being used" });
  });
});

router.post('/', isAuthenticated, function(req, res) {
  console.log(req.body);
    var product = new Product ({
        reference: req.body.reference,
        description: req.body.description,
        purchase_price: req.body.purchase_price,
        sell_price: req.body.sell_price,
        tax_price: req.body.sell_price,
        tax: req.body.tax,
        seller: req.session.passport.user
    });

    product.save(function(err) {
      if (err)
        res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error creating product"});
      else res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Product created", ObjectId: product._id });
    });
});

router.delete('/:product_id', isAuthenticated, function(req, res) {
  Product.findOne({ _id: req.params.product_id, seller: req.session.passport.user }, function (err, product) {
    if (err)
      res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error" });
    else if (product._id == null)
      res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This product doesn't exist" });
    else {
      product.remove();
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Product deleted" });
    }
  });
});

module.exports = router;
