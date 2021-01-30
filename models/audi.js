var mongoose=require("mongoose");

var audiSchema=new mongoose.Schema(
{
	name: {type: String, require: true, enum: ["audi1","audi2","audi3"]},
	
	
	

	showTimes:[{

		start: Number,
		available: Boolean
		
		
	}]
	

});

module.exports=mongoose.model("Audi",audiSchema);