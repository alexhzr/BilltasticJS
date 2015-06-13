var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Order = require('./Order');
var Customer = new Schema({
	id_number: String,
	name: String,
	phone: Number,
	address: String,
	email: String,
	seller: { type: Schema.Types.ObjectId, ref: 'Seller'}
});

Customer.post('remove', function(doc) {
  Order.remove({ customer: doc._id }).exec();
});

module.exports = mongoose.model("Customer", Customer);
