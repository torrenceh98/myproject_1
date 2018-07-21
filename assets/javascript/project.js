// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVAgMQ160Gjz9cwBkiiXtlXHvEQwX-n8U",
    authDomain: "groupproject1-bf127.firebaseapp.com",
    databaseURL: "https://groupproject1-bf127.firebaseio.com",
    projectId: "groupproject1-bf127",
    storageBucket: "",
      };
  firebase.initializeApp(config);
 
  var dataRef = firebase.database();


$("#lyricBtn").hide()
$("#list-group").hide()


$("#submitBtn").on("click", function(event){
    event.preventDefault();
   
    
var artistSearch = $("#inputSearch").val();

   //Creates variable for holding data
var newArtistSearch = {
    artist: artistSearch
};

//Uploads artist search to the database
dataRef.ref().push(newArtistSearch);
    
    console.log(artistSearch);


var queryURL = "https://api.audd.io/?method=findLyrics&q=" + artistSearch + "&api_token=f846db22eaf81cb3e7a79d0af9df399c"


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    
console.log(response.result[0].lyrics);
    

for (var i = 0; i < response.result.length; i++) {

    var ourLyrics = response.result[i].lyrics;
    var ourSongs = response.result[i].full_title;

    //This creates Lyric button dynamically
    var lyricBtn = $('<button id="lyricBtn" type="button" class="btn btn-primary bg-secondary" data-toggle="modal" data-target="#exampleModalLong'+ [i] + '" > Lyrics </button>')

    var modalBtn = $('<div class="modal fade" id="exampleModalLong'+ [i] + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLongTitle" style="background-color: black;">LYRICS</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div id="insideBtn' + [i] + '" class="modal-body" style="background-color: black;">' + ourLyrics + '</div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> ')


    //this creates card to put lyric button and song title
    var newLi = $(' <li class="list-group-item" style="background-color: transparent; color: white"></li>')
    newLi.append('<br/>' + ourSongs + "<br/>")

        newLi.append(lyricBtn)
        newLi.append(modalBtn)
        
    $('#list-group').append(newLi)

  }  
});

$("#lyricBtn").show()
$("#list-group").show()


//adding query search with artist and api key
var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + artistSearch + "&type=video&key=AIzaSyA1cXXxMTZqpq24jIa7rz0UQW5DbhSQ1bs"

$.ajax({
   url: youtubeURL,
   method: "GET"
  }).then(function(response) {
      //console.log(response);
  
       //this is where we get the video id from the object//
var videoID = response.items[1].id.videoId;
  //var videoID = response.items[1].snippet.channelId;
         //getting the title for the result
var songTitle = response.items[1].snippet.title;
   //var songTitle = response.items[1].snippet.channelId;
         console.log(songTitle);
       //creating the results
       

       //creating link to youtube//
    
       
       //create link to youtube
var topOfTheCharts = $('<span style="background-color: transparent; color: white">' + songTitle + '</span>');

var createYoutubeLink = $('<button id="youtubeBtn">' + '<a target="_blank" href="https://www.youtube.com/watch?v=' + videoID + '" > Play Video </a>' + '</button>');
       //appending div to the page//
     $("#list-group").append(topOfTheCharts);
     $("#list-group").append(createYoutubeLink);
       });


});






 

