var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Order = new Schema({
    order_date: Date,
    seller: String,
    customer: String,
    products: Array,
    total: Number,
    pending: Number,
    status: Number,
    printed: Number,
    sent: Number
});

module.exports = mongoose.model("Order", Order);
