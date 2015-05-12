var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Customer = require('../models/customer');

//to find by id
router.get('/', /*isAuthenticated, */function(req, res) {
    Customer.find({ 'seller': '5551e12aaf8a71972b89a40a'/*req.session.passport.user*/ }, function(err, customerList) {
        if (err) return handleError(err);
        res.json(customerList);
    })
});

router.get('/:customer_id', /*isAuthenticated,*/ function(req, res) {
    Customer.findById(req.params.customer_id, function(err, customer) {
        if (err)
            res.json({message: "fallo"});
        res.json(customer);
    });
});

router.post('/', /*isAuthenticated,*/ function(req, res) {
    var customer = new Customer({
        name: req.body.name,
        telephone: req.body.telephone,
        address: req.body.address,
        email: req.body.email,
        seller: req.session.passport.user
    });

    console.log(customer);

    customer.save(function(err) {
      if(err)
           res.send(err);
      else res.json({ message: "Customer created"});
   });
});

module.exports = router;