var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');

router.get('/', isAuthenticated, function(req, res) {
    console.log(req.session);
    console.log(req.session.passport.user);
});

module.exports = router;