var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Order = require('./Order');
var Customer = new Schema({
	name: String,
	telephone: Number,
	address: String,
	email: String,
	seller: String
});

Customer.post('remove', function(doc) {
	console.log(doc);
    Order.remove({ customer: doc._id }).exec();
});

module.exports = mongoose.model("Customer", Customer);