var express=require("express"),
	router=express.Router(),
	mongoose=require("mongoose"),
	movies=require("../models/movies"),
	screening=require("../models/screening"),
	reservation=require("../models/reservation");



router.get("/profile",function(req,res)
{
	console.log(req.user.username);
	reservation.find({username:req.user.username}).populate("screening_id").exec(function(err,bookings)
	{
		if(err)
		{

			req.flash("error","No Reservations Found!!")
			res.render("profile");
			console.log(err);
		}
		else
		{
				res.render("profile",{bookings:bookings});
		}
		
	})
	// reservation.findById(reservation_id).populate("screening_id").exec(function(err,reservation)
	// 		{
	// 			if(err)
	// 				console.log(err);
	// 			else
	// 			{
	// 				console.log(reservation);
	// 				res.render("booking/finalTicket",{reservation});
	// 			}
	// 		})
})





function isUser(req,res,next)
	{
		if(req.isAuthenticated())
			return next();
		req.flash("error","You Must be signed in as User");
		res.redirect("/admin/login");
	}


module.exports=router;