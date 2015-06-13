var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Order = new Schema({
    order_date: Date,
    seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    products: [
			{
				product: { type: Schema.Types.ObjectId, ref: 'Product' },
				amount: Number
			}
		],
    total: Number,
    pending: Number,
    status: Number,
    printed: Number,
    sent: Number
});

module.exports = mongoose.model("Order", Order);
