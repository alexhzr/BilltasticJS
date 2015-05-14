var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Order = require('./order');
var Customer = new Schema({
	name: String,
	telephone: Number,
	address: String,
	email: String,
	seller: String
});

Customer.pre('remove', function(next) {
    Order.remove({ customer: this._id }).exec();
    next();
});

Customer.plugin(passportLocalMongoose);

module.exports = mongoose.model("Customer", Customer);