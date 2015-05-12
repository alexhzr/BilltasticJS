var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Customer = new Schema({
	name: String,
	telephone: Number,
	address: String,
	email: String,
	seller: String
});

Customer.plugin(passportLocalMongoose);

module.exports = mongoose.model("Customer", Customer);