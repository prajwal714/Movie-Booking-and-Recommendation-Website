ar mongoose=require("mongoose");

var seatSchema=new mongoose.Schema(
{
	number: Number,
	auditorium:
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "auditorium"
	}
});