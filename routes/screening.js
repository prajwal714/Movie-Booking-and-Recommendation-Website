var express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  screening = require("../models/screening"),
  movies = require("../models/movies"),
  audi = require("../models/audi");

//==================================Screen Management=======================================
//show screening movies
router.get("/screening", isAdmin, function(req, res) {
  screening.find({}, function(err, screen) {
    if (err) console.log(err);
    else res.render("screens/showScreen", { screen: screen });
  });
});
// add movies to screening
router.get("/screening/new", isAdmin, function(req, res) {
  movies.find({}, function(err, allmovies) {
    audi.find({}, function(err, allaudi) {
      if (err) console.log(err);
      else res.render("screens/create", { movies: allmovies, audi: allaudi });
    });
  });
});
router.post("/screening/new", function(req, res) {
  var movie = req.body.movie_name;
  var showTimes = req.body.show_time;

  showTimes.forEach(function(show_time) {
    var aud = show_time.split("_");
    audi.updateOne(
      { _id: aud[0], "showTimes.start": aud[1] },
      { $set: { "showTimes.$.available": "false" } },
      function(err, updated) {
        if (err) console.log(err);
        else {
          console.log(updated);
          movies.findOne({ name: movie }, function(err, foundmovie) {
            if (err) console.log(err);
            else {
              var newscreen = {
                movie: foundmovie,
                audi_id: aud[0],
                screening_start: aud[1],
                seats: [
                  { id: "A1", available: true },
                  { id: "A2", available: true },
                  { id: "A3", available: true },
                  { id: "A4", available: true },
                  { id: "A5", available: true },
                  { id: "A6", available: true },
                  { id: "A7", available: true },
                  { id: "A8", available: true },
                  { id: "A9", available: true },
                  { id: "A10", available: true },
                  { id: "B1", available: true },
                  { id: "B2", available: true },
                  { id: "B3", available: true },
                  { id: "B4", available: true },
                  { id: "B5", available: true },
                  { id: "B6", available: true },
                  { id: "B7", available: true },
                  { id: "B8", available: true },
                  { id: "B9", available: true },
                  { id: "B10", available: true }
                ]
              };

              screening.create(newscreen, function(err, screen) {
                if (err) console.log(err);
              });
              movies.updateOne(
                { name: movie },
                { $inc: { screening: 1 } },
                function(err, M) {
                  if (err) console.log(err);
                  else {
                    console.log(M);
                  }
                }
              );
            }
          });
        }
      }
    );
  });

  req.flash("success", "Successfully Created a new Screen");
  res.redirect("/index");
});

// delete screening movie
router.delete("/screening/:id", isAdmin, function(req, res) {
  screening.findOne({ _id: req.params.id }, function(err, screen) {
    if (err) console.log(err);
    else {
      console.log(screen);
      var audi_id = screen.audi_id;
      var start_time = screen.screening_start;
      screening.findByIdAndRemove(req.params.id, function(err) {
        if (err) console.log(err);
        else {
          movies.updateOne(
            { _id: screen.movie._id },
            { $inc: { screening: -1 } },
            function(err, up) {
              if (err) console.log(err);
              else console.log(up);
            }
          );
          console.log("screen deleted");
          console.log(audi_id + "," + start_time);
          audi.updateOne(
            { _id: audi_id, "showTimes.start": start_time },
            { $set: { "showTimes.$.available": true } },
            function(err, updated) {
              if (err) console.log(err);
              else console.log(updated);
            }
          );
          req.flash("success", "Successfully removed the Screen");
          res.redirect("/screening");
        }
      });
    }
  });
});

function isAdmin(req,res,next)
  {
    if(req.isAuthenticated()&&req.user.isAdmin==true)
      return next();
    req.flash("error","You Must be signed in as admin");
    res.redirect("/admin/login");
  }


module.exports = router;
