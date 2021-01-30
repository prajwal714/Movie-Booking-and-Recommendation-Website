var express=require("express"),
	mongoose=require("mongoose"),
	router=express.Router(),
	admin=require("../models/admin"),
	user=require("../models/user"),
	passport=require("passport"),
	localStrategy=require("passport-local");


	

		router.get("/admin",isAdmin,function(req,res)
		{
			var admin=req.user;
			res.render("home.ejs");
		})
//=======================to signup new admin user===================
		router.get("/admin/signup",function(req,res)
		{

			res.render("admin/signup");
		});

		

	router.post("/admin/signup",function(req,res)
	{
		var newAdmin=new admin({username:req.body.username});
		admin.register(newAdmin,req.body.password,function(err,admin)
		{
			if(err)
			{
				console.log(err);

				req.flash("error",err.message);
				return res.render("admin/signup");
			}
			passport.authenticate("local")(req,res,function()
			{
				console.log("Succesfully signed up");
				req.flash("success","Succesfully Signed Up !!");
				res.redirect("/index");
			});
		})
	});

	

//==================login admin user ===========================	
	router.get("/admin/login",function(req,res)
	{
		
		res.render("admin/login");
	});
	router.post("/admin/login",passport.authenticate("local",
		{
			successRedirect: "/index",
			failureRedirect: "/admin/login"
		}),function(req,res)
	{
		

	});
	

//===============logout route====================
	router.get("/admin/logout",function(req,res)
	{
		req.logout();
		req.flash("success","Logged You Out Successfully !");
		res.redirect("/index");
	});
	


function isAdmin(req,res,next)
	{
		if(req.isAuthenticated()&&req.user.isAdmin==true)
			return next();
		req.flash("error","You Must be signed in as Admin");
		res.redirect("/admin/login");
	}


	module.exports=router;