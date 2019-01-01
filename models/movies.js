
var mongoose=require("mongoose");
var movieSchema=new mongoose.Schema(
{
	name: String,
	img: String,
	ratings: Number,
	director: String,
	summary: String,
	release: Number,
	duration: Number
	
});


module.exports=mongoose.model("movies",movieSchema);