var express=require("express"),
	router=express.Router(),
	mongoose=require("mongoose"),
	screening=require("../models/screening"),
	movies=require("../models/movies"),
	audi=require("../models/audi");







	//==================================Screen Management=======================================
//show screening movies
router.get("/screening",function(req,res)
{

	screening.find({},function(err,screen)
	{
		if(err)
			console.log(err);
		else
			res.render("screens/showScreen",{screen:screen});
	});
})
 // add movies to screening
 router.get("/screening/new",function(req,res)
 {
 	movies.find({},function(err,allmovies)
		{
			audi.find({},function(err,allaudi)
			{
				if(err)
				console.log(err);
			else
				res.render("screens/create",{movies:allmovies,audi:allaudi});
			})
			
		});
 	
 });
 router.post("/screening/new",function(req,res)
 {
 	var movie=req.body.movie_name;
 	var showTimes=req.body.show_time;

 	showTimes.forEach(function(show_time){
 		var aud=show_time.split("_");
 		audi.updateOne({"_id":aud[0],"showTimes.start":aud[1]},{$set:{"showTimes.$.available":"false"}},function(err,updated)
		 	{
		 		if(err)
		 			console.log(err)
		 		else
		 		{
		 			console.log(updated);
		 			movies.findOne({"name":movie},function(err,foundmovie)
				 	{
				 		if(err)
				 			console.log(err);
				 		else
				 		{
				 			var newscreen={
				 					movie: foundmovie,
				 					audi_id: aud[0],
				 					screening_start: aud[1],
				 					seats: [{id: "A1",available: true},
				 							{id: "A2",available: true},
				 							{id: "A3",available: true},
				 							{id: "A4",available: false},
				 							{id: "A5",available: false},
				 							{id: "A6",available: true},
				 							{id: "A7",available: true},
				 							{id: "A8",available: false},
				 							{id: "A9",available: true},
				 							{id: "A10",available: true},
				 							{id: "B1",available: true},
				 							{id: "B2",available: true},
				 							{id: "B3",available: true},
				 							{id: "B4",available: false},
				 							{id: "B5",available: false},
				 							{id: "B6",available: true},
				 							{id: "B7",available: true},
				 							{id: "B8",available: false},
				 							{id: "B9",available: true},
				 							{id: "B10",available: true}]};

						 	screening.create(newscreen,function(err,screen)
						 	{
						 		if(err)
						 			console.log(err);
						 		
						 	});
						}
				 
				 		
				 		
				 		
				 	});
		 		}
		 			
						 			
			});

 	});
 	
 	
 	movies.updateOne({"name":movie},{$set:{"screening":true}},function(err,M)
 	{
 		if(err)
 			console.log(err);
 		else
 		{
 			res.redirect("/");
 			console.log(M);
 		}
 	});
 	
 });

 // delete screening movie
 router.delete("/screening/:id",function(req,res)
 {
 	screening.findOne({"_id":req.params.id},function(err,screen)
 	{
 		if(err)
 			console.log(err);
 		else
 		{
 			console.log(screen);
 			var audi_id=screen.audi_id;
 			var start_time=screen.screening_start;
 			screening.findByIdAndRemove(req.params.id,function(err)
			 	{
			 		if(err)
			 			console.log(err);
			 		else
			 		{
			 			movies.updateOne({"_id":screen.movie._id},{$set:{"screening":false}},function(err,up)
			 			{
			 				if(err)
			 					console.log(err);
			 				else
			 					console.log(up);
			 			});
			 			console.log("screen deleted");
			 			console.log(audi_id+","+start_time);
			 			audi.updateOne({"_id":audi_id,"showTimes.start":start_time},{$set:{"showTimes.$.available": true}},function(err,updated)
						 	{
						 		if(err)
						 			console.log(err);
						 		else
						 			console.log(updated);
						 	});

			 			res.redirect("/screening");
			 		}

			 	});

 			
 		}
 	});
 	
 	

 	
 	
 });

 module.exports=router;