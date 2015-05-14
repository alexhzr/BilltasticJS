var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Product = require('../models/product');
var app = require('../app');

router.get('/', isAuthenticated, function(req, res) {
    Product.find({ seller: req.session.passport.user }, function(err, productList) {
        if (err) return handleError(err);
        res.json(productList);
    })
});

router.get('/:product_id', isAuthenticated, function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_RESPONSE: "Error loading products" });
        res.json(product);
    });
});

router.post('/', isAuthenticated, function(req, res) {
    var product = new Product ({
        name: req.body.name,
        price: req.body.price,
        tax: req.body.tax,
        seller: req.session.passport.user
    });

    product.save(function(err) {
      if(err)
           res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error creating product"});
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Product created", ObjectID: product._id });
   });
});

module.exports = router;