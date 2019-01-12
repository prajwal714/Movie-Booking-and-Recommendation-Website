var express=require("express"),
	router=express.Router(),
	mongoose=require("mongoose"),
	reservation=require("../models/reservation");

	router.post("/check",function(req,res)
	{
		var mob_num=req.body.srch;
		reservation.find({"contact":mob_num}).populate("screening_id").exec(function(err,found)
		{
			res.render("./search/status",{ticket:found});
			console.log(found);
		});
		
		
	});


module.exports=router;