const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const adminSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	profile:{
		type:String,
	},
	email:{
		type:String,
		required:true,
		unique:true,
	},
	password:{
		type:String,
		required:true,
	},

	Record:[
		{entry:{type:Date, default:(new Date()).getDay()},	exit:{ type:Date}}
	
	]
	
},{ timestamps: true })


adminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const Admin = mongoose.model('admin',adminSchema)
module.exports = Admin;