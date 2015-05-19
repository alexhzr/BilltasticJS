var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Product = new Schema({
	name: String,
	price: Number,
	tax: String,
	seller: String
});

module.exports = mongoose.model("Product", Product);