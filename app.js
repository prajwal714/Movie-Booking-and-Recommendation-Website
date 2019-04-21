const express=require("express"),
	// MongoClient=require("mongodb").MongoClient,
	app=express(),
	mongoose=require("mongoose"),
	flash=require("connect-flash"),
	passport=require("passport"),
    LocalStrategy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	
	

	movies=require("./models/movies"),
	audi=require("./models/audi"),
	admin=require("./models/admin"),
	user=require("./models/user"),
	reservation=require("./models/reservation"),
	screening=require("./models/screening"),
	methodOverride=require("method-override"),
	seed=require("./seed"),


	bodyParser=require("body-parser");
	app.use(express.static("public"));
	app.set("view engine","ejs");
	app.use(bodyParser.urlencoded({extended:true}));
	// mongoose.connect("mongodb://prajwal:prajwal71421@ds161794.mlab.com:61794/bookmyshow");
	//mongoose.connect("mongodb://prajwal:prajwal71421@ds139534.mlab.com:39534/bookmyshow");
	// mongoose.connect("mongodb://localhost/bookmyshow");
	mongoose.connect("mongodb+srv://prajwal:prajwal71421@cluster0-mbqck.gcp.mongodb.net/mbook");
	app.use(methodOverride("_method"));
	app.use(flash());

	seed();

	

	var indexRoutes=require("./routes/index");
	var moviesRoutes=require("./routes/movies");
	var	screeningRoutes=require("./routes/screening");
	var bookingRoutes=require("./routes/booking");
	var authenticationRoutes=require("./routes/authentication");
	var search=require("./routes/check");
	var profile=require("./routes/profile");

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

		// passport.use(new LocalStrategy(user.authenticate()));
		// passport.serializeUser(user.serializeUser());
		// passport.deserializeUser(user.deserializeUser());

		 app.use(function(req,res,next)
		{
			console.log(req.user);
		  //we pass the currentUser variable to every ejs tenplate which contains the info of current user
		  res.locals.admin=req.user;
		  res.locals.error=req.flash("error");
		  res.locals.success=req.flash("success");
		  next();
		});

		app.use(indexRoutes);	
		app.use(moviesRoutes);
		app.use(screeningRoutes);
		app.use(bookingRoutes);
		app.use(authenticationRoutes);
		app.use(search);
		app.use(profile);

	
	 

   app.listen(process.env.PORT,process.env.IP,function()
	{
		console.log("Server started at port 2000");
	});
