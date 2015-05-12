var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Product = new Schema({
	name: String,
	price: Number,
	tax: String,
	seller: String
});

Product.plugin(passportLocalMongoose);

module.exports = mongoose.model("Product", Product);