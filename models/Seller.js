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

Seller.pre('remove', function(next) {
    Customer.remove({ seller: this._id }).exec();
    Product.remove({ seller: this._id }).exec();
    Tax.remove({ seller: this._id }).exec();
    Order.remove({ seller: this._id }).exec();
    next();
});

Seller.plugin(passportLocalMongoose);

module.exports = mongoose.model("Seller", Seller);