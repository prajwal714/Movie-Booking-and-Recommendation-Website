var mongoose=require("mongoose"),
	passportLocalMongoose=require("passport-local-mongoose");

	var adminSchema=mongoose.Schema(
	{
		username: String,
		password: String,
		isAdmin: {type: Boolean,default: false}
	});

	\oo
	module.exports=mongoose.model("Admin",adminSchema);