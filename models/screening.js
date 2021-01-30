var mongoose=require("mongoose");

var screeningSchema=new mongoose.Schema(
{
	
	movie: {
			type:Object
			},
	
	screening_start: Number,

	audi_id: String,

	seats: [{
	id: String,
	available: Boolean
	}]
	
});

module.exports=mongoose.model("screening",screeningSchema);