var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Customer = require('./Customer');
var Product = require('./Product');
var Tax = require('./Tax');
var Order = require('./Order');

var Seller = new Schema({
	name: String,
	email: String,
	username: String,
	password: String
});

Seller.post('remove', function(doc) {
    Customer.remove({ seller: doc._id }).exec();
    Product.remove({ seller: doc._id }).exec();
    Tax.remove({ seller: doc._id }).exec();
    Order.remove({ seller: doc._id }).exec();
});

Seller.plugin(passportLocalMongoose);

module.exports = mongoose.model("Seller", Seller);
