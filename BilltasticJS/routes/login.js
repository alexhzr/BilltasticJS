var express = require('express');
var router = express.Router();
var passport = require('passport');
var Seller = require('../models/Seller');

router.get('/', function(req, res, next) {
  res.json({ response: 'hola'});
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err)
            return next(err);
        if (!user)
            return res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Wrong credentials" });
        req.logIn(user, function(err) {
            if (err)
                return next(err);
            return res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!" });
        });
    })(req, res, next);
});


module.exports = router;
