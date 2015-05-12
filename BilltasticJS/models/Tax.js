var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var Tax = new Schema({
	name: String,
	value: number,
	seller: String
});

Tax.plugin(passportLocalMongoose);

module.exports = mongoose.model("Tax", Tax);