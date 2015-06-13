var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Order = require('../models/Order');
var moment = require('moment');
var dateFormat = "DD/MM/YYYY HH:mm:SS";

router.get('/', isAuthenticated, function(req, res) {
    Order.find({ seller: req.session.passport.user }, function(err, orders) {
        if (err) return handleError(err);
        res.json(orders);
    });
});

router.get('/:order_id', isAuthenticated, function(req, res) {
    Order.findById(req.params.order_id, function(err, order) {
        if (err)
          res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error loading orders" });
        else if (order == null)
          res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This order doesn't exist" });
        else {
          order.populate('customer products.product', function(err, order) {
            if (err)
              res.json({ SERVER_RESPONSE: 5, SERVER_MESSAGE: "Error populating order" });
            else res.json(order);
          });
        }
    });
});

router.post('/', isAuthenticated, function(req, res) {
    var order = new Order ({
        order_date: moment(req.body.order_date, dateFormat),
        seller: req.session.passport.user,
        customer: req.body.customer,
        products: req.body.products,
        total: req.body.total,
        pending: req.body.pending,
        status: req.body.status,
        printed: req.body.printed,
        sent: req.body.sent
    });

    order.save(function(err) {
      if(err)
           res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error creating order"});
      else res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Order created", ObjectId: order._id });
    });
});

router.delete('/:order_id', isAuthenticated, function(req, res) {
    Order.findOne({ _id: req.params.order_id, seller: req.session.passport.user }, function(err, order) {
        if (err)
          res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error deleting" });
        else if (order._id == null)
          res.json({ SERVER_RESPONSE: 4, SERVER_MESSAGE: "This order doesn't exist" });
        else {
          order.remove();
          res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Order deleted" });
        }
    })
});

module.exports = router;
