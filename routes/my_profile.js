var express = require('express');
var router = express.Router();
var passport = require('passport');
var Seller = require('../models/Seller');
var isAuthenticated = require('./isAuthenticated');

router.delete('/', isAuthenticated, function(req, res) {
  Seller.findOne({ _id: req.session.passport.user }, function(err, seller) {
    if (err)
      return handleError(err);
    else {
      seller.remove();
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "User deleted" });
    }
  });
});

module.exports = router;
