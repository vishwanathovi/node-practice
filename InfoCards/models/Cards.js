var mongoose = require('mongoose');

var CardsSchema = new mongoose.Schema({
	title: {type: String, unique: true, required: [true, "can't be blank"]},
	content: {type: String, required: [true, "can't be blank"]},
	likes: Number,
	tags:[String],
	author: {type:mongoose.Schema.Types.ObjectId, ref:"Users"}
},{timestamps: true});

module.exports = mongoose.model('Cards',CardsSchema);

