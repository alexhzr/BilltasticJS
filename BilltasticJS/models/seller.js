var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SellerSchema = new Schema({
	name: String,
	email: String,
	username: String,
	password: String
});

module.exports = mongoose.model("Seller", SellerSchema);