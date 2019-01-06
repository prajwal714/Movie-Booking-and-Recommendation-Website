const express=require("express"),
	// MongoClient=require("mongodb").MongoClient,
	app=express(),
	mongoose=require("mongoose"),
	movies=require("./models/movies"),
	audi=require("./models/audi"),
	reservation=require("./models/reservation"),
	screening=require("./models/screening"),
	methodOverride=require("method-override"),
	seed=require("./seed"),
	bodyParser=require("body-parser");

	app.use(express.static("public"));
	app.set("view engine","ejs");
	app.use(bodyParser.urlencoded({extended:true}));
	mongoose.connect("mongodb://localhost/bookmyshow");
	app.use(methodOverride("_method"));

	seed();

	var indexRoutes=require("./routes/index");
	var moviesRoutes=require("./routes/movies");
	var	screeningRoutes=require("./routes/screening");
	var bookingRoutes=require("./routes/booking");
		

		app.use(indexRoutes);	
		app.use(moviesRoutes);
		app.use(screeningRoutes);
		app.use(bookingRoutes);

	
	
   app.listen(2000,'127.0.0.1',function()
	{
		console.log("Server started at port 2000");
	});