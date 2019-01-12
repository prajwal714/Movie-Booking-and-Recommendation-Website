# Movie-Booking-Website


This is a Movie Booking website using Nodejs. express and MongoDB.
Their are 2 views of the website :
1> User View

  In this you can view the screening movies, see more info about them, book them based on available show timings.
  Choose your desired available seat and finally get a ticket for your movie.
  Also you can check status of your ticket using the search option which requires your registered mobile number while booking the ticket.
  
  
 2> Admin View
    This view is protected by authentication using passport.js
    
    username: Prajwal
    password: 12345
    
    In this view their are multiple admin features :
    
    1. Screening Movies: In this you can view or delete all the currently screening movies in the movie theatres.
    
    2. Manange Screen: In this you can map the movies to the audi along with the specific show timing(s). Show timings are available based
                        on your previously left time slots. I have used 4 time slots of 9,12,15 and 1800 Hrs.
    
    3. Manage movies: In this you can add or delete the movies which you might want to add to the screens.
    
