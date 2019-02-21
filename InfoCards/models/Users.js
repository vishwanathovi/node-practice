var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase: true, required: [true, "can't be blank"]},
	email: {type: String, lowercase: true, required: [true, "can't be blank"]},
	password: String,
	cards:[{type:mongoose.Schema.Types.ObjectId, ref:"Cards"}]
},{timestamps: true});


UserSchema.methods.comparePassword = function(pw){
	return bcrypt.compareSync(pw, this.password);
}


module.exports = mongoose.model('Users',UserSchema);