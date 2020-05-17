const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

 //login
const UserSchema = mongoose.Schema({
	email: {
		type: String
	},
	password:{
		type:String,
		bcrypt: true
	},
	type:{
		type:String
	}
	
});

const User = module.exports = mongoose.model('User', UserSchema);