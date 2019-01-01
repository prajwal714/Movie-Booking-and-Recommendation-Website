const mongoose=require("mongoose");

var reservationSchema=new mongoose.Schema(
{
	screening_id :
	{
			type: mongoose.Schema.Types.ObjectId,
			ref: "screening"
		
	},
	username: String,
	email: String,
	contact: Number,
	seats: Array
});

module.exports=mongoose.model("reservation",reservationSchema);