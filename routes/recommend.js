const express=require("express"),
    router=express.Router(),
    bodyParser=require("body-parser"),
    request=require("request-promise");

    var app=express();
    var data;
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended:false}));


    
    router.get("/recommendations",async function(req,res)
    {
        res.render("./recommend/input.ejs");

    });
    router.post("/getData",async function(req,res)
    {
    	var liked_movies=[];
        
    	console.log(req.body.movie);
        var obj={movie: req.body.movie};
        data=obj;
        res.redirect("/postDatatoFlask");
        

    });
    router.get("/postDatatoFlask",async function(req,res)
    {
        
        // var data={movie:"Fargo"};
        if(data)
        {
            var options={
                method: "POST",
                url: "http://127.0.0.1:5000/postdata",
                body: data,
                json: true
            };
        }
        else
        console.log("The input movie was empty");
       

        var returndata;
        var sendrequest=await request(options)
        .then(function(parsedBody)
        {
            console.log(parsedBody);
            for(var i=0;i<parsedBody.length;i++)
             console.log(parsedBody[i]);
            // var obj=JSON.stringify(parsedBody);
            // console.log(obj);
           res.send(parsedBody);
        // res.render("./recommend/result.ejs",{movies:});
           
        }).then(function()
        {
            console.log("movie recommendations was succesfull");
           
        })
        .catch(function(err)
        {
            console.log(err);
        });
    });

   module.exports=router;