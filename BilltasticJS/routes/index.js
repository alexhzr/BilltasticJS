var express = require('express');
var router = express.Router();
var passport = require('passport');
var Seller = require('../models/seller');

router.get('/', function(req, res, next) {
  res.json({ response: 'hola'});
});

router.post('/', passport.authenticate('local'), function(req, res) {
	res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in" })
});

module.exports = router;
