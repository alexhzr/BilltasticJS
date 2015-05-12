var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');

router.get('/', isAuthenticated, function(req, res) {
    req.logout();
	res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged out" })
});

module.exports = router;