var express=require("express"),
	mongoose=require("mongoose"),
	omdbApi=require("omdb-client"),
	router=express.Router(),
	request=require("request"),
	movies=require("../models/movies");
	


//========================MOVIES Management====================================


//create movies 
router.get("/movie",isAdmin,function(req,res)
{
	movies.find({},function(err,allmovies)
		{
			if(err)
				console.log(err);
			else
				res.render("movies/movie-manage",{movies:allmovies});
		});
	
})
router.get("/movie/create",isAdmin,function(req,res)
{
	res.render("movies/create.ejs");
});
//post route for Adding new movies to the movies[] in database
router.post("/movie/create",isAdmin,function(req,res)
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
			console.log(err);
		else
		{
			console.log("new movie created");
			req.flash("success","Successfully Added a New Movie");
			res.redirect("/movie");
		}
	})

	});
//DElete movies from database
router.delete("/movie/:id",isAdmin,function(req,res)
{
	movies.findByIdAndRemove(req.params.id,function(err)
	{
		if(err)
		{
			console.log(err);
			req.flash("error","Their was some Error");
			res.redirect("/movie");
		}
		else
		{
			console.log("movie deleted");
			req.flash("sucess","Movie Deleted");
			res.redirect("/movie");
		}
	})
});
//=====================adding movie using omdb api================
router.post("/movie/omdb",function(req,res)
{	
	return res.json(400).send({error:"The service is unavailable for now!! sorry"});
	
	var params={
		apiKey: "facfe877",
		query: req.body.title
	}
	
	omdbApi.search(params,function(err,data)
	{
		if(err)
		{
		console.log(err);
		req.flash("error","Movie Not Found!!");
		res.redirect("/movie")
		}
		else
		{
			
			  res.render("movies/search.ejs",{search:data.Search}); 
		}
	});
	
   
	
	
	
});

router.post("/create/:id",function(req,res)
{
	//http://www.omdbapi.com/?i=tt2737304&apikey=fbc34bf1
	var url="http://www.omdbapi.com/?i="+req.params.id+"&apikey=fbc34bf1";

	request({url: url,
			 json: true},function(err,movie,response){
			 	if(err)
			 	console.log(err)
			 	else
			 	{
			 		var duration=(movie.body.Runtime.slice(" "));
			 		var release=movie.body.Released.split(" ");
			 		var newmovie={
			 			name: movie.body.Title,
						img: movie.body.Poster,
						ratings: movie.body.Ratings[0].Value,
						director: movie.body.Director,
						summary: movie.body.Plot,
						release: release[2],
						duration: Number(duration[0]),
			 		}
			 	movies.create(newmovie,function(err,added)
			 	{
			 		if(err)
			 		console.log(err)
			 		else
			 		{
			 			req.flash("success","New Movie Added");
			 			console.log("new movie added");
			 			res.redirect("/movie");
			 		}
			 	})
			 	}
			 	
			 });
			 

});

// function isAdmin(req,res,next)
// 	{
// 		if(req.isAuthenticated())
// 			return next();
// 		req.flash("error","You Must be Signed in as Admin");
// 		res.redirect("/admin/login");
// 	}

	function isAdmin(req,res,next)
	{
		if(req.isAuthenticated()&&req.user.isAdmin==true)
			return next();
		req.flash("error","You Must be signed in as admin");
		res.redirect("/admin/login");
	}

	


module.exports=router;
