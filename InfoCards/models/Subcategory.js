var mongoose = require('mongoose');

var SubcategorySchema = new mongoose.Schema({
	title: {type: String, unique: true, required: [true, "can't be blank"]},
	category: {type: mongoose.Schema.Types.ObjectId, required: [true, "can't be blank"], ref:"Category"},
	cards:[{type:mongoose.Schema.Types.ObjectId, ref:"Cards"}]
},{timestamps: true});

module.exports = mongoose.model('Subcategory',SubcategorySchema);

