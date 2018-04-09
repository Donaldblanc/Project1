<<<<<<< HEAD

// Jose's CODE 
const movies = ["Howard the Duck", "The Punisher ", "Captain America", "The Fantastic Four (1994)", "Blade",
=======
$(document).ready(function () {

  const movies = ["Howard the Duck", "The Punisher ", "Captain America", "The Fantastic Four (1994)", "Blade",
>>>>>>> master
    "X-Men",
    "Blade II",
    "Spider-Man",
    "Daredevil",
    "Hulk",
    "Spider-Man 2",
    "Blade: Trinity",
    "Elektra",
    "Man-Thing",
    "Fantastic Four",
    "X-Men: The Last Stand",
    "Ghost Rider",
    "Spider-Man 3",
    "Fantastic Four: Rise of the Silver Surfer",
    "Iron Man",
    "The Incredible Hulk",
    "Punisher: War Zone",
    "X-Men Origins",
    "Iron Man 2",
    "Thor",
    "X-Men: First Class",
    "Captain America: The First Avenger",
    "Ghost Rider: Spirit of Vengeance",
    "Avengers",
    "The Amazing Spider-Man",
    "Iron Man 3",
    "The Wolverine",
    "Thor: The Dark World",
    "Captain America: The Winter Soldier",
    "The Amazing Spider-Man 2",
    "X-Men: Days of Future Past",
    "Guardians of the Galaxy",
    "Big Hero 6",
    "Avengers: Age of Ultron",
    "Ant-Man",
    "Deadpool",
    "Captain America: Civil War",
    "X-Men: Apocalypse",
    "Doctor Strange",
    "Logan",
    "Guardians of the Galaxy Vol. 2",
    "Spider-Man: Homecoming",
    "Thor: Ragnarok",
    "Black Panther"];

<<<<<<< HEAD

    function displayMovieInfo() {

      for (var i = 0; i < movies.length; i++) {
  
        var movie = movies[i];
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        // var queryURL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=CaptainAmericatrailer&key=AIzaSyC8th4wDxjLmTn1fONnkSMaUaGAGTUNQRA"
  
        fetch(queryURL).then(function (response) {
          return (response.json());
        }).then(function (response) {
          console.log("****THE VANILLA WAY****");
          // console.log(response);
          createButton(response);
  
        }).catch(function (response) {
          console.log("***** This failed *****")
          console.log(response);
        });
  
        localStorage.setItem("movie" + i, movies[i]);
        localStorage.setItem("movies", JSON.stringify(movies));
      }
  
    }//displayMovieInfo


    function createButton(response) {
      var movieDiv = $("<div class='movie'>");
      var a = $("<button id = 'movie_id'>");
      a.addClass("movie-btn");
      a.attr("data-name", response.imdbID);
      a.text(response.Title);
      movieDiv.append(a)
  
      var released = response.Released;
      var pTwo = $("<p>").text("Released: " + released);
  
      movieDiv.append(pTwo);
  
      var plot = response.Plot;
      var pThree = $("<p>").text("Plot: " + plot);
  
      movieDiv.append(pThree);
  
      // ------------------For Youtube --------------------------//
  
      var play = $(' <div class="youtube-player" data-id="VIDEO_ID"></div>');
      movieDiv.append(play);
  
      // ------------------For Youtube --------------------------//
  
      $(".container").prepend(movieDiv);
    }//createButton
  
    displayMovieInfo();
  
    // using event bubbling to provide a single listener
    document.querySelector('.container').addEventListener("click", function (e) {
      console.log(e)
      console.log(e.srcElement);
  
      if (e.srcElement.className == "movie-btn") {
        console.log("Button ID :" + e.srcElement.id);
        console.log("Movie Id :" + e.srcElement.dataset.name);
        console.log("Class Name :" + e.srcElement.className);
        let movie_id = e.srcElement.dataset.name;
        console.log("passed ID " + e.srcElement.dataset.name);
        character_array(movie_id);
      }// movie-btn lisenter
    });// container listener
  
    function character_array(movieID) {
      var movie_ID = movieID
      // console.log(movie_ID);
      var queryURL2 = "https://api.themoviedb.org/3/movie/" + movie_ID + "/credits?api_key=cf7b01cd6ffa681f8ced55fe3eac526f";
      console.log(queryURL2);
      var char_array = [];
      fetch(queryURL2).then(function (response) {
=======
  function displayMovieInfo() {

    for (var i = 0; i < movies.length; i++) {

      var movie = movies[i];
      var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
      // var queryURL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=CaptainAmericatrailer&key=AIzaSyC8th4wDxjLmTn1fONnkSMaUaGAGTUNQRA"

      fetch(queryURL).then(function (response) {
>>>>>>> master
        return (response.json());
      }).then(function (response) {
        console.log("****THE VANILLA WAY****");
        // console.log(response);
<<<<<<< HEAD
        for (i = 0; i < 10; i++) {
          char_array.push(response.cast[i]);
        }
        console.log(char_array);
=======
        createButton(response);

>>>>>>> master
      }).catch(function (response) {
        console.log("***** This failed *****")
        console.log(response);
      });
<<<<<<< HEAD
    }//character Array 
  




//***************************  DONALD SECTION ********************************************




// marvel API call 
// written in Vanilla Java script 

const apiAuth = "&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";
const marvURL = "https://gateway.marvel.com/v1/public/";
var charSearch = "characters?name=";
var name = "spider-man";
var charId = ""


var queryURL = marvURL + charSearch + name + apiAuth;

// variable declaration

console.log(queryURL);

//var test = " https://gateway.marvel.com/v1/public/characters?name=spider-man&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";

// function to get my ID
var getTheId = function (idname) {
  return document.querySelector(idname);
}


// builds the 
function getCharacters(name) {

  console.log(name);
  var newURL = marvURL + charSearch + name + apiAuth;
  getQuery(newURL);
}

var searchButton = getTheId("#run-search");

searchButton.onclick = function (event) {
  //var charName2 = document.getElementById("char-name").value;
  var charName = getTheId("#char-name").value.trim();
  if (charName) {
    getCharacters(charName);
  } else {
    alert("you have to enter a character");
  }

};

var comicButton = getTheId("#comic-search");
comicButton.onclick = function (event) {

  console.log("The comics button");
  getComics(charId);
};

// using the promise API native to Javascript specific the fetch API 
function getQuery(search) {

  const kevsServer = "https://mighty-river-19291.herokuapp.com/cors";
  var data = {
    url: search,
    key: "8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
  }

  fetch(kevsServer, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })

  }).then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(function (response) {
      console.log("****THE Vanilla WAY IS THE BEST WAY ;) !!!****");
      console.log(response);
      // console.log(response.data.results[0].name);
      // console.log(response.data.results[0].id);
      // console.log(response.data.results[0].description);
      // console.log(response.data.results[0].thumbnail);
      // console.log(response.data.results[0].thumbnail.path + "."  + response.data.results[0].thumbnail.extension);

      charId = response.data.results[0].id;

      printToPage(response);
      return response;
    });

}//getQuery


function getComics(charId) {
// need to set a boolean here for if a user has chosen a new character.
//  let newURL = marvURL + "characters/" + charId + "/comics?limit=100&offset=100" + apiAuth;
  let newURL = marvURL + "characters/" + charId + "/comics?limit=100&offset=100" + apiAuth;
  console.log("The comics fired");
  console.log(charId);
  console.log(newURL);
  loadMore(charId);
    

  //https://gateway.marvel.com:443/v1/public/characters/1009624/comics?limit=100&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f

}//getComics 



function printToPage(response) {
  console.log(response.data.results[0].name);
  console.log(response.data.results[0].id);
  console.log(response.data.results[0].description);
  console.log(response.data.results[0].thumbnail);
  console.log(response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension);


  var title = response.data.results[0].name;
  var imageUrl = response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension;
  var heroID = response.data.results[0].id;
  var description = response.data.results[0].description
  var comicDiv = $("<div class='character'>");
  var h3 = $("<h3>").text("Title: " + title);
  var p = $("<p>").text("Description: " + description);

  var charImage = $("<img>");
  comicDiv.attr("data-name", heroID);
  charImage.attr("src", imageUrl);

  comicDiv.append(h3);
  comicDiv.append(charImage);
  comicDiv.append(p);

  $("#characters").append(comicDiv);

}//printToPage



// infinite scroll section for comic Div
var listElm = document.querySelector('#infinite-comiclist');
// Add 20 items.
var nextItem = 0;
//var loadMore = function () 
function loadMore(char){

  let charId = "1009610";

  let newURL = marvURL + "characters/" + charId + "/comics?limit=10&offset=" +nextItem + apiAuth;
  const kevsServer = "https://mighty-river-19291.herokuapp.com/cors";
  var data = {
    url: newURL,
    key: "8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
  }

  fetch(kevsServer, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })

  }).then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(function (response) {
      console.log("****THE Load more function****");
      console.log(response);
   // console.log(Object.keys(response).length);
    console.log(response.data.results.length);
     // console.log(response.data.results[0].title);

      // debuggin lines printing title to console.
      for (var i = 0; i < response.data.results.length ; i++) {
        console.log(response.data.results[i].title);
      }
      
      for (var i = 0; i < response.data.results.length ; i++) {
         var item = document.createElement('li');
         item.innerText = 'Title ' + response.data.results[i].title;
         listElm.appendChild(item);
         console.log("Comic Image: " +response.data.results[i].thumbnail.path + "." + response.data.results[i].thumbnail.extension);
       }

       nextItem += 11;
       console.log("The Value of nextItem :" +  nextItem );    
    });
    
}

// Detect when scrolled to bottom.
listElm.addEventListener('scroll', function () {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMore();
  }
});
=======

      localStorage.setItem("movie" + i, movies[i]);
      localStorage.setItem("movies", JSON.stringify(movies));
    }

  }//displayMovieInfo

  function createButton(response) {
    var movieDiv = $("<div class='movie'>");
    var a = $("<button id = 'movie_id'>");
    a.addClass("movie-btn");
    a.attr("data-name", response.imdbID);
    a.text(response.Title);
    movieDiv.append(a)

    var released = response.Released;
    var pTwo = $("<p>").text("Released: " + released);

    movieDiv.append(pTwo);

    var plot = response.Plot;
    var pThree = $("<p>").text("Plot: " + plot);

    movieDiv.append(pThree);

    // ------------------For Youtube --------------------------//

    var play = $(' <div class="youtube-player" data-id="VIDEO_ID"></div>');
    movieDiv.append(play);

    // ------------------For Youtube --------------------------//

    $(".container").prepend(movieDiv);
  }//createButton

  displayMovieInfo();

  // using event bubbling to provide a single listener
  document.querySelector('.container').addEventListener("click", function (e) {
    console.log(e)
    console.log(e.srcElement);

    if (e.srcElement.className == "movie-btn") {
      console.log("Button ID :" + e.srcElement.id);
      console.log("Movie Id :" + e.srcElement.dataset.name);
      console.log("Class Name :" + e.srcElement.className);
      let movie_id = e.srcElement.dataset.name;
      console.log("passed ID " + e.srcElement.dataset.name);
      character_array(movie_id);
    }// movie-btn lisenter
  });// container listener

  function character_array(movieID) {
    var movie_ID = movieID
    // console.log(movie_ID);
    var queryURL2 = "https://api.themoviedb.org/3/movie/" + movie_ID + "/credits?api_key=cf7b01cd6ffa681f8ced55fe3eac526f";
    var char_array = [];
    fetch(queryURL2).then(function (response) {
      return (response.json());
    }).then(function (response) {
      console.log("****THE VANILLA WAY****");
      // console.log(response);
      for (i = 0; i < 10; i++) {
        char_array.push(response.cast[i]);
      }
      console.log(char_array);
    }).catch(function (response) {
      console.log("***** This failed *****")
      console.log(response);
    });
  }//character Array 

})//documentOnReady


>>>>>>> master
