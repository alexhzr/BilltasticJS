var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Customer = require('../models/tax');

router.get('/', /*isAuthenticated, */function(req, res) {
    Customer.find({ 'seller': '5551e12aaf8a71972b89a40a'/*req.session.passport.user*/ }, function(err, customerList) {
        if (err) return handleError(err);
        res.json(customerList);
    })
});

router.get('/:tax_id', /*isAuthenticated,*/ function(req, res) {
    Customer.findById(req.params.tax_id, function(err, customer) {
        if (err)
            res.json({message: "fallo"});
        res.json(customer);
    });
});

router.post('/', /*isAuthenticated,*/ function(req, res) {
    var tax = new Tax ({
        name: req.body.name,
        value: req.body.value,
        seller: req.session.passport.user
    });

    console.log("tax.js - tax created: "+tax);

    customer.save(function(err) {
      if(err)
           res.send(err);
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Tax created"});
   });
});

module.exports = router;