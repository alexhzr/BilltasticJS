var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuthenticated = require('./isAuthenticated');
var Order = require('../models/order');
var OrderDetail = require('../models/order');
var moment = require('moment');
var dateFormat = "DD/MM/YYYY HH:mm:SS";

router.get('/', isAuthenticated, function(req, res) {
    Order.find({ seller: req.session.passport.user }, function(err, orderList) {
        if (err) return handleError(err);
        res.json(orderList);
    });
});

router.get('/:order_id', isAuthenticated, function(req, res) {
    Order.findById(req.params.product_id, function(err, order) {
        if (err)
            res.json({ SERVER_RESPONSE: 0, SERVER_RESPONSE: "Error loading orders" });
        res.json(order);
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
        printed: 0,
        sent: 0
    });

    order.save(function(err) {
      if(err)
           res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Error creating order"});
      res.json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Order created", ObjectID: order._id });
   });
});

module.exports = router;
