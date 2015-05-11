var express = require('express');
var router = express.Router();
var Seller = require('../models/seller');

router.post('/', function(req, res) {
	var seller = new Seller();
	seller.name = req.body.name;
	seller.email = req.body.email;
	seller.username = req.body.username;
	seller.password = req.body.password;

	console.log(seller);

	seller.save(function(err) {
		if(err)
			res.send(err);
		else res.json({ message: "Seller created"});
	})
});

router.get('/', function(req, res) {
	Seller.find(function(err, sellers) {
		if(err)
			res.send(err);
		else res.json(sellers);
	})
});

module.exports = router;
