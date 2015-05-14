var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Customer = require('../models/customer');
var Order = require('../models/order');

router.get('/', isAuthenticated, function(req, res) {
    Customer.find({ seller: req.session.passport.user }, function(err, customerList) {
        if (err) return handleError(err);
        res.json(customerList);
    })
});

router.get('/:customer_id', isAuthenticated, function(req, res) {
    Customer.findById(req.params.customer_id, function(err, customer) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error getting customer info" });
        else res.json(customer);
    });
});

router.delete('/:customer_id', /*isAuthenticated,*/ function(req, res) {
    Customer.remove({ _id: req.params.customer_id }, function(err) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error deleting", ERR: err });
        else res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Customer deleted" });
    })
});

router.get('/:customer_id/orders', isAuthenticated, function(req, res) {
    Order.find({ customer: req.params.customer_id, seller: req.session.passport.user }, function(err, orderList) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error getting orders" });
        else res.json(orderList);
    });
});

router.post('/', isAuthenticated, function(req, res) {
    var customer = new Customer({
        name: req.body.name,
        telephone: req.body.telephone,
        address: req.body.address,
        email: req.body.email,
        seller: req.session.passport.user
    });

    customer.save(function(err) {
      if(err)
           res.send(err);
      else res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Customer created", ObjectID: customer._id });
   });
});

module.exports = router;