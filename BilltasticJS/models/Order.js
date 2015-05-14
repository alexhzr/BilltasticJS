var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

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

Order.plugin(passportLocalMongoose);

module.exports = mongoose.model("Order", Order);
