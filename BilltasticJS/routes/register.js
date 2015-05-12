var express = require('express');
var router = express.Router();
var passport = require('passport');
var Seller = require('../models/seller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ response: 'register page'});
  //res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
Seller.register(new Seller({ username : req.body.username, name: req.body.name, email: req.body.email }), req.body.password, function(err, seller) {
        if (err) {
            res.json({message: "holas"});
            //return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

module.exports = router;