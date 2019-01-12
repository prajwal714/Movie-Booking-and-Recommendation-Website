const express=require("express"),
	// MongoClient=require("mongodb").MongoClient,
	app=express(),
	mongoose=require("mongoose"),
	 passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
	movies=require("./models/movies"),
	audi=require("./models/audi"),
	admin=require("./models/admin"),
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
	var authenticationRoutes=require("./routes/authentication");
	var search=require("./routes/check");

	app.use(require("express-session")(
		{ 
		  secret: "hello world",
		  resave: false,
		  saveUninitialized: false

		}
		));
		app.use(passport.initialize());
		app.use(passport.session());
		passport.use(new LocalStrategy(admin.authenticate()));
		passport.serializeUser(admin.serializeUser());
		passport.deserializeUser(admin.deserializeUser());

		 app.use(function(req,res,next)
		{
			console.log(req.user);
		  //we pass the currentUser variable to every ejs tenplate which contains the info of current user
		  res.locals.admin=req.user;
		  next();
		});

		app.use(indexRoutes);	
		app.use(moviesRoutes);
		app.use(screeningRoutes);
		app.use(bookingRoutes);
		app.use(authenticationRoutes);
		app.use(search);

	
	 


   app.listen(2000,'127.0.0.1',function()
	{
		console.log("Server started at port 2000");
	});