var mongoose=require("mongoose");

var screeningSchema=new mongoose.Schema(
{
	
	movie: {
			type:Object
			},
	
	screening_start: Number,

	audi_id: String,

	seats: [{
	row: String,
	number: Number,
	available: Boolean
	}]
	
});

module.exports=mongoose.model("screening",screeningSchema);