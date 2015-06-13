var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Tax = require('../models/Tax');

router.get('/', isAuthenticated, function(req, res) {
    Tax.find({ seller: req.session.passport.user }, function(err, taxes) {
        if (err) return handleError(err);
        res.json(taxes);
    })
});

router.get('/:tax_id', isAuthenticated, function(req, res) {
    Tax.findById(req.params.tax_id, function(err, tax) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_RESPONSE: "Error loading taxes" });
        res.json(tax);
    });
});

router.post('/', isAuthenticated, function(req, res) {
    var tax = new Tax ({
        name: req.body.name,
        value: req.body.value,
        seller: req.session.passport.user
    });

    tax.save(function(err) {
      if(err)
        res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error creating tax" });
      else res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Tax created", ObjectID: tax._id });
    });
});

router.delete('/:tax_id', isAuthenticated, function(req, res) {
  Tax.findOne({ _id: req.params.tax_id, seller: req.session.passport.user }, function(err, tax) {
    if (err)
      res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error deleting tax" });
    else if (tax._id == null)
        res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This tax doesn't exist" });
    else {
      tax.remove();
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Tax deleted" });
    }
  });
});

module.exports = router;
