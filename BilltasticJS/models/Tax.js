var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Tax = new Schema({
	name: String,
	value: Number,
	seller: String
});

module.exports = mongoose.model("Tax", Tax);