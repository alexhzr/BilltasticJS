var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Order = require('./Order');
var Product = new Schema({
	reference: String,
	description: String,
	purchase_price: Number,
	sell_price: Number,
	tax_price: Number,
	tax: { type: Schema.Types.ObjectId, ref: 'Tax' },
	seller: { type: Schema.Types.ObjectId, ref: 'Seller' }
});

Product.post('remove', function(err, product) {
	Order.remove({ product: product._id }).exec();
});

module.exports = mongoose.model("Product", Product);
