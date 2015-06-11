var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Product = new Schema({
	reference: String,
	description: String,
	purchase_price: Number,
	sell_price: Number,
	tax_price: Number,
	tax: String,
	seller: String
});

module.exports = mongoose.model("Product", Product);
