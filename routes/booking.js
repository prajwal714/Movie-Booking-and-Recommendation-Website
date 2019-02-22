var express=require("express"),
	router=express.Router(),
	mongoose=require("mongoose"),
	movies=require("../models/movies"),
	screening=require("../models/screening"),
	reservation=require("../models/reservation");





//=============================================BOOK movie ticktes================================================

router.get("/book/:id",isUser,function(req,res)
{
		movies.findById(req.params.id,function(err,movie)
			{
				if(err)
					console.log(err);
				else
				{
					screening.find({"movie.name":movie.name},function(err,screen)
					{
						if(err)
							console.log(err);
						else
						{
							console.log("screen found for booking");
							res.render("booking/bookMovie",{screen:screen,movie:movie});
						}
					});
					
				}
			});
			
	
});

router.get("/book_seat/:id",isUser,function(req,res)
{

	screening.findById(req.params.id,function(err,found)
	{
		
		if(err)
			console.log(err);
		else
		{

			res.render("booking/seatBooking",{screen:found});
		}
	});
	
});

router.post("/book_seat/:id/update",function(req,res)
{

	var S=req.body.check_list;
	var name=req.body.username;
	var seatNum=req.body.seatNum;

	var newReservation={
		username:name,
		email:req.body.email,
		contact:req.body.contact,
		seats:req.body.check_list,
		screening_id:req.params.id

	};
	console.log(req.body.check_list);
	
	S.forEach(function(seat)
	{
		console.log(seat);
		screening.updateOne({"_id":req.params.id,"seats.id":seat},{$set:{"seats.$.available":false}},function(err,updated)
		{
			if(err)
				console.log(err);
			else
				console.log(updated);
		});
		

	});
	var reservation_id;
	reservation.create(newReservation,function(err,r)
	{
		if(err)
			console.log(err);
		else
		{
			console.log("new reservation created");
			reservation_id=r._id;
			console.log(reservation_id);
			reservation.findById(reservation_id).populate("screening_id").exec(function(err,reservation)
			{
				if(err)
					console.log(err);
				else
				{
					console.log(reservation);
					res.render("booking/finalTicket",{reservation});
				}
			})
			
			
		}

	});


	
});

 	function isUser(req,res,next)
	{
		if(req.isAuthenticated())
			return next();
		req.flash("error","You Must be signed in as User");
		res.redirect("/admin/login");
	}


 	module.exports=router;