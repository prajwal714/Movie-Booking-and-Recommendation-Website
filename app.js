const express = require("express"),
	// MongoClient=require("mongodb").MongoClient,
	app = express(),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	helmet = require('helmet')
dotenv = require('dotenv');

dotenv.config();



admin = require("./models/admin"),


	methodOverride = require("method-override"),
	seed = require("./seed"),


	bodyParser = require("body-parser");
app.use(helmet());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_API, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("connected to DB");
app.use(methodOverride("_method"));
app.use(flash());

seed();
console.log("DB Seed complete");



var indexRoutes = require("./routes/index");
var moviesRoutes = require("./routes/movies");
var screeningRoutes = require("./routes/screening");
var bookingRoutes = require("./routes/booking");
var authenticationRoutes = require("./routes/authentication");
var search = require("./routes/check");
var profile = require("./routes/profile");

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



app.use(function (req, res, next) {
	console.log(req.user);
	//we pass the currentUser variable to every ejs tenplate which contains the info of current user
	res.locals.admin = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(moviesRoutes);
app.use(screeningRoutes);
app.use(bookingRoutes);
app.use(authenticationRoutes);
app.use(search);
app.use(profile);


let port = process.env.PORT || 3000;
let ip = process.env.IP || '127.0.0.1';

app.listen(port, ip, function () {
	console.log(`Server started at port ${port}`);
});
