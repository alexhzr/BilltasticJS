var express = require('express');
var router = express.Router();
var passport = require('passport');
var Seller = require('../models/Seller');

router.get('/check_username/:username', function(req, res) {
  Seller.findOne({ username: req.params.username }, function(err, seller) {
    if (err)
      res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE:"There was an error" });
    else if (seller == null)
      res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "No seller found" });
    else res.json({ SERVER_RESPONSE: 3, SERVER_MESSAGE: "This username is being used" });
  });
});

router.post('/', function(req, res) {
Seller.register(new Seller({
  username : req.body.username,
  name: req.body.name,
  email: req.body.email }), req.body.password, function(err, seller) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error registering" });

        passport.authenticate('local')(req, res, function () {
            res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Registered OK and session started" })
        });
    });
  });

module.exports = router;
