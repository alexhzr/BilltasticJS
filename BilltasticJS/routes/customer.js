var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Customer = require('../models/customer');

//to find by id
router.get('/', function(req, res) {
    res.json({ message: "base" });
});

router.get('/:id', /*isAuthenticated,*/ function(req, res) {
    Customer.findById(req.body.customer_id, function(err, customer) {
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