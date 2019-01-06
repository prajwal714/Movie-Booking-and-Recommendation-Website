var express=require("express"),
	mongoose=require("mongoose"),
	router=express.Router(),
	movies=require("../models/movies");


//========================MOVIES Management====================================


//create movies 
router.get("/movie",function(req,res)
{
	movies.find({},function(err,allmovies)
		{
			if(err)
				console.log(err);
			else
				res.render("movies/movie-manage",{movies:allmovies});
		});
	
})
router.get("/movie/create",function(req,res)
{
	res.render("movies/create.ejs");
});
//post route for Adding new movies to the movies[] in database
router.post("/movie/create",function(req,res)
{
	var name=req.body.name;
	var img=req.body.img;
	var ratings=req.body.ratings;
	var director=req.body.director;
	var summary=req.body.summary;
	var release=req.body.release;
	var duration=req.body.duration;

	var newmovie={name:name,img:img,ratings:ratings,director:director,summary:summary,release:release,duration:duration};
	movies.create(newmovie,function(err,movie)
	{
		if(err)
			consol.log(err);
		else
		{
			console.log("new movie created");
			res.redirect("/");
		}
	})

	});
//DElete movies from database
router.delete("/movie/:id",function(req,res)
{
	movies.findByIdAndRemove(req.params.id,function(err)
	{
		if(err)
			console.log(err);
		else
		{
			console.log("movie deleted");
			res.redirect("/movie");
		}
	})
});


module.exports=router;