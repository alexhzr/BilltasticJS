var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Product = require('./Product');
var Tax = new Schema({
	name: String,
	value: Number
});

Tax.post('remove', function(tax) {
	Product.remove({ tax: tax._id }).exec();
});

module.exports = mongoose.model("Tax", Tax);
