var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	title: {type: String, unique: true, required: [true, "can't be blank"]},
	subcategory:[{type:mongoose.Schema.Types.ObjectId, ref:"Subcategory"}]
},{timestamps: true});

module.exports = mongoose.model('Category',CategorySchema);

