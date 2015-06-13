var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Customer = require('../models/Customer');
var Order = require('../models/Order');

router.get('/', isAuthenticated, function(req, res) {
    Customer.find({ seller: req.session.passport.user }, function(err, customers) {
        if (err)
          res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error getting customers" });
        else res.json(customers);
    });
});

router.get('/:customer_id', isAuthenticated, function(req, res) {
    Customer.findById(req.params.customer_id, function(err, customer) {
        if (err)
          res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error getting customer info" });
        else if (customer == null)
          res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This customer doesn't exist" });
        else res.json(customer);
    });
});

router.get('/check_id/:id_number', isAuthenticated, function(req, res) {
  Customer.findOne({ id_number: req.params.id_number, seller: req.session.passport.user }, function(err, customer) {
    if (err)
      res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error checking ID number" });
    else if (customer == null)
      res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This ID is not being used" });
    else res.json({ SERVER_RESPONSE: 3, SERVER_MESSAGE: "This ID is being used" });
  });
});

router.get('/:customer_id/orders', isAuthenticated, function(req, res) {
    Order.find({ customer: req.params.customer_id, seller: req.session.passport.user }, function(err, orders) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error getting orders" });
        else res.json(orders);
    });
});

router.post('/', isAuthenticated, function(req, res) {
    var customer = new Customer({
        id_number: req.body.id_number,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        seller: req.session.passport.user
    });

    customer.save(function(err) {
      if (err)
           res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error saving customer" });
      else res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Customer created", ObjectID: customer._id });
    });
});

router.delete('/:customer_id', isAuthenticated, function(req, res) {
    Customer.findOne({ _id: req.params.customer_id, seller: req.session.passport.user }, function(err, customer) {
        if (err)
          res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error deleting", ERR: err });
        else if (customer == null)
          res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This customer doesn't exist" });
        else {
          customer.remove();
          res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Customer deleted" });
        }
    });
});

module.exports = router;
