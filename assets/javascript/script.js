
// Jose's CODE 
const movies = ["Howard the Duck", "The Punisher ", "Captain America", "The Fantastic Four", "Blade",
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
  "Rise of the Silver Surfer",
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

var char_array = [];

var movNum = 0


function displayMovieInfo() {

 // if (movNum == movies.length) return;

  var end = movNum + 7;

  // if the end growth lager than the movie array reset it the value of the length
  if (end > movies.length) end = movies.length;

  for (var i = movNum; i < end; i++) {

    var movie = movies[i];
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    fetch(queryURL).then(function (response) {
      return (response.json());
    }).then(function (response) {
      //console.log("****THE VANILLA WAY****");
      // console.log(response);
      createButton(response);

    }).catch(function (response) {
      // console.log("***** This failed *****")
      // console.log(response);
    });
  }
  movNum = end;
}//displayMovieInfo

var movElm = document.querySelector('#theMovie-list');

// Detect when scrolled to bottom.
movElm.addEventListener('scroll', function () {
  if (movElm.scrollTop + movElm.clientHeight >= movElm.scrollHeight) {
    displayMovieInfo();
  }
});

var firstMov = 0
function createButton(response) {
  //console.log(response.Poster);
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

  var imgURL = response.Poster; //retrieve poster
  var image = $("<img>").attr("src", imgURL);

  //-----------------------IGNORE ---- YOUTUBE LINK BEING PUT ON CAMERA ICON LINE 189 OF CURRENT CODE---------------//

  // var play = $(' <div id="player">');
  // // play.attr("data-id", response_youtube.items[0].id.videoId);
  // movieDiv.append(play);

  //-----------------------IGNORE ---- YOUTUBE LINK BEING PUT ON CAMERA ICON LINE 189 OF CURRENT CODE---------------//

  movieDiv.append(pThree);

  // $("#theMovie-list").append(movieDiv);

  var li = document.createElement('li');

  // (firstMov == 0 )  ? li.setAttribute('class','one_third first movie-btn') :  (firstMov == 3 ) li.setAttribute('class','one_third first movie-btn'), firstMov = 0 :  li.setAttribute('class','one_third  movie-btn');


  (firstMov == 0) ? li.setAttribute('class', 'one_third first movie-btn') :
    (firstMov == 3) ? (li.setAttribute('class', 'one_third first movie-btn'), firstMov = 0) : li.setAttribute('class', 'one_third  movie-btn');
  firstMov++

  li.setAttribute("data-name", response.imdbID);
  var article = document.createElement("article");
  article.setAttribute('class', "bgded overlay");
  article.style.backgroundImage = "url(" + imgURL + ")";
  var div = document.createElement("div")
  div.setAttribute('class', "txtwrap");

  // //------------------fancybox element-----------------------//

  // var iFra = document.createElement("a");
  // iFra.setAttribute('class', "fancybox fancybox.iframe");
  // iFra.setAttribute("data-name", response.Title);
  // iFra.setAttribute('href', "https://www.youtube.com/embed/8A7bNJCjkx8");
  // iFra.innerHTML = "Movie Trailer";

  // //------------------fancybox element-----------------------//
  var movieTitle = response.Title
  var iElm = document.createElement("a");
  iElm.setAttribute('class', "fancybox fancybox.iframe block fa fa-4x fa-camera");

  var h6 = document.createElement('h6');
  h6.innerHTML = movieTitle;
  var p = document.createElement('p');
  p.innerHTML = plot;
  var footer = document.createElement("footer");

  var more = document.createElement('a');
  // more.setAttribute('href', '');
  more.setAttribute('class', "movie-btn")
  more.setAttribute("data-name", response.imdbID)
  more.innerHTML = "More &raquo;";

  //------------------fancybox element-----------------------//
  // div.appendChild(iFra);
  //------------------fancybox element-----------------------//

  div.appendChild(iElm);
  div.appendChild(h6);
  div.appendChild(p);
  footer.appendChild(more);
  article.appendChild(div);
  article.appendChild(footer);
  li.appendChild(article);

  $(iElm).fancybox({
    maxWidth: 800,
    maxHeight: 600,
    fitToView: true,
    width: '70%',
    height: '70%',
    autoSize: false,
    closeBtn: false,
    closeClick: false,
    openEffect: 'elastic',
    closeEffect: 'elastic',
  });

  document.querySelector('#theMovie-list').appendChild(li);

  //-------------------addition for embeding youtube--------------------------//

  var movieTitle = response.Title
  var queryURL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=" + movieTitle + "trailer&key=AIzaSyC8th4wDxjLmTn1fONnkSMaUaGAGTUNQRA";

  fetch(queryURL1).then(function (response_youtube) {
    return (response_youtube.json());
  }).then(function (response_youtube) {
    // console.log("****THE VANILLA WAY****");
    // console.log(response_youtube.items[0].id.videoId);
    video_Id = response_youtube.items[0].id.videoId;
    iElm.setAttribute('href', "https://www.youtube.com/embed/" + video_Id + "?autoplay=1");
    // console.log(response_youtube);
  }).catch(function (response_youtube) {
    // console.log("***** This failed *****")
    // console.log(response_youtube);

  });

  //-------------------addition for embeding youtube--------------------------//

}//createButton

displayMovieInfo();

// ************* using event bubbling to provide a single listener *************/
document.querySelector('.listen').addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e)
  // console.log(e.srcElement);

  if (e.srcElement.className == "movie-btn") {
    clearElements("infinite-charlist");
    // console.log("Button ID :" + e.srcElement.id);
    // console.log("Movie Id :" + e.srcElement.dataset.name);
    // console.log("Class Name :" + e.srcElement.className);
    let movie_id = e.srcElement.dataset.name;
    // console.log("passed ID " + e.srcElement.dataset.name);
    char_array = [];
    character_array(movie_id);
  }// movie-btn lisenter


  if (e.srcElement.className == "char-btn") {
    clearElements("infinite-comiclist");
    // console.log("Character Clicked");
    // console.log("Button ID :" + e.srcElement.id);
    // console.log("CharId :" + e.srcElement.dataset.name);
    // console.log("Class Name :" + e.srcElement.className);

    // console.log("passed ID " + e.srcElement.dataset.name);
    nextItem = 0;
    getComics(e.srcElement.dataset.name);
  }// movie-btn lisenter




});// container listener

function character_array(movieID) {
  var movie_ID = movieID
  // console.log(movie_ID);
  var queryURL2 = "https://api.themoviedb.org/3/movie/" + movie_ID + "/credits?api_key=cf7b01cd6ffa681f8ced55fe3eac526f";
  // console.log(queryURL2);

  fetch(queryURL2).then(function (response_imdb) {
    return (response_imdb.json());
  }).then(function (response_imdb) {

   // console.log(response_imdb);
    var special_char;
    gen_character(response_imdb);

  }).catch(function (response_imdb) {
  //  console.log("***** This failed *****")
   // console.log(response_imdb);
  });
}//character Array 


function gen_character(response_imdb) {

  for (i = 0; i <= 10; i++) {//this for loop will create a first original array with name of characters 
    if (response_imdb.cast[i].character.includes('/')) {
      special_char = '/';
      var characters_split;
      characters_split = response_imdb.cast[i].character.split(special_char); //store the split array
      for (var j = 0; j < characters_split.length; j++) {
        //push each item of the array into the char_array
        if (characters_split[j].includes('(')) {//find string that contains "("
          special_char = '(';
          characters_split = characters_split[j].split(special_char); //split string into array
          // console.log(characters_split);
          char_array.push(characters_split[0]);//only grab first string of array, the first string is always the name of character in movie
        } else {
          char_array.push(characters_split[j]);
        }
      }
    } else if (response_imdb.cast[i].character.includes('(')) {//find string that contains "("
      special_char = '(';
      characters_split = response_imdb.cast[i].character.split(special_char); //split string into array
      // console.log(characters_split);
      char_array.push(characters_split[0]);//only grab first string of array, the first string is always the name of character in movie
    }
    else {
      char_array.push(response_imdb.cast[i].character);
    }
  }
  localStorage.setItem("Characters", JSON.stringify(char_array));
  var characters_array = char_array.slice();
  // console.log("Current array :" + char_array);
  // console.log("length of Current array :" + char_array.length);
  // console.log("New array :" + characters_array);
  // console.log("length of New array :" + characters_array.length);

  for (var k = 0; k < char_array.length; k++) {
    var length = char_array.length + 1;
    // console.log(char_array.length);
    // console.log(k);
    var temp_character = characters_array[k];
    // console.log("Before trim :" + temp_character);
    temp_character = temp_character.replace(/^\s+|\s+$/gm, '');
    // console.log("After trim :" + temp_character);
    characters_array.splice(length, 1, temp_character);
    // console.log("Array without unnecessary spaces :" + characters_array);
    var temp_character_1 = temp_character.replace(/\s+/g, '');//removes all spaces and pushes to array
    // console.log("Name without spaces :" + temp_character_1);
    characters_array.splice(length, 0, temp_character_1);
    var temp_character_2 = temp_character.replace(/\s+/g, '-');//replaces spaces for slash and pushes to array
    // console.log("Name with slash :" + temp_character_2);
    characters_array.splice(length, 0, temp_character_2);
    var temp_character_4 = temp_character.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');//replaces spaces for slash and pushes to array .....infinite loop being created
    // console.log("Name without slash :" + temp_character_4);
    characters_array.splice(length, 0, temp_character_4);
    if (temp_character.indexOf('The') > -1) {
      var temp_character_3 = temp_character.split('The')
      // temp_character_3 = temp_character_3.replace(/^\s+|\s+$/gm, '');
      // console.log("Name without 'The' :" + temp_character_3[1]);
      characters_array.push(temp_character_3[1]);
    } else {
      temp_character_3 = temp_character;
    }
  }
  var filtered_char_array = uniqBy(characters_array, JSON.stringify);
  function uniqBy(a, key) {
    var index = [];
    return a.filter(function (item) {
      var k = key(item);
      return index.indexOf(k) >= 0 ? false : index.push(k);
    });
  }
  localStorage.setItem("Characters", JSON.stringify(filtered_char_array));
  // console.log("Final array 1 length :" + char_array.length);
  // console.log("Final array 2 length :" + characters_array.length);
  // console.log("Final array :" + characters_array);

  getCharacters(characters_array)
}

//***************************  DONALD SECTION ********************************************

function clearElements(parent) {

  var myNode = document.getElementById(parent);
  while (myNode.firstChild) {
   // console.log("Removing: " + myNode.firstChild)
    myNode.removeChild(myNode.firstChild);
  }

}//clearElments


// marvel API call 
// written in Vanilla Java script 

const apiAuth = "&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";
const marvURL = "https://gateway.marvel.com/v1/public/";
var charSearch = "characters?name=";
var name = "spider-man";
var charId = "";


var queryURL = marvURL + charSearch + name + apiAuth;

// variable declaration

//console.log(queryURL);

//var test = " https://gateway.marvel.com/v1/public/characters?name=spider-man&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";

// function to get my ID
var getTheId = function (idname) {
  return document.querySelector(idname);
}


// builds the 
function getCharacters(name) {
  // console.log(name.isArray())

 // console.log("The Value of GetCharacters " + name[0]);
  //console.log("length " + name.length);

  function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }


  cleanName = remove_duplicates_es6(name);
 // console.log("The Duplicate REMOVED" + name);


  for (var i = 0; i < name.length; i++) {
    var newURL = marvURL + charSearch + cleanName[i] + apiAuth;
   // console.log("Testing character :" + cleanName[i]);
    getQuery(newURL);

  }

}

// var searchButton = getTheId("#run-search");

// searchButton.onclick = function (event) {
//   //var charName2 = document.getElementById("char-name").value;
//   var charName = getTheId("#char-name").value.trim();
//   if (charName) {

//    // getCharacters(charName);

//   } else {
//     alert("you have to enter a character");
//   }

// };

// var comicButton = getTheId("#comic-search");
// comicButton.onclick = function (event) {

//   console.log("The comics button");
//   getComics(charId);
// };

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
      // console.log("****THE Vanilla WAY IS THE BEST WAY ;) !!!****");
      // console.log(response);
      // // console.log(response.data.results[0].name);
      // console.log(response.data.results[0].id);
      // console.log(response.data.results[0].description);
      // console.log(response.data.results[0].thumbnail);
      // console.log(response.data.results[0].thumbnail.path + "."  + response.data.results[0].thumbnail.extension);
     // console.log(response.data.results.length)

      if (response.data.results.length > 0) {
        charId = response.data.results[0].id;
        printToPage(response);
        //console.log("We found a character");
      } else {
        //console.log("Sorry no results for this character");
      }


    });

}//getQuery


function getComics(charId) {
  // need to set a boolean here for if a user has chosen a new character.
  let newURL = marvURL + "characters/" + charId + "/comics?limit=100&offset=100" + apiAuth;
  // let newURL = marvURL + "characters/" + charId + "/comics?limit=100&offset=100" + apiAuth;
  // console.log("The comics fired");
  // console.log(charId);
  // console.log(newURL);
  loadMore(charId);


  //https://gateway.marvel.com:443/v1/public/characters/1009624/comics?limit=100&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f

}//getComics 


var firstChar = 0;
function printToPage(response) {
  // console.log(response.data.results[0].name);
  // console.log(response.data.results[0].id);
  // console.log(response.data.results[0].description);
  // console.log(response.data.results[0].thumbnail);
  // console.log(response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension);

  var title = response.data.results[0].name;
  var imageUrl = response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension;
  var heroID = response.data.results[0].id;
  var description = response.data.results[0].description

  // var comicDiv = $("<div class='character'>");
  // var h3 = $("<h3>").text("Title: " + title);
  // var p = $("<p>").text("Description: " + description);

  // var charImage = $("<img>");
  // comicDiv.attr("data-name", heroID);
  // charImage.attr("src", imageUrl);

  // comicDiv.append(h3);
  // comicDiv.append(charImage);
  // comicDiv.append(p);

  // $("#characters").append(comicDiv);

  var li = document.createElement('li');
  (firstChar == 0) ? li.setAttribute('class', 'one_third first comic-btn') :
    (firstChar == 3) ? (li.setAttribute('class', 'one_third first comic-btn'), firstChar = 0) : li.setAttribute('class', 'one_third  comic-btn');
  firstChar++

  // li.setAttribute('class','one_third  char-btn') ;        

  li.setAttribute("data-name", heroID);
  var article = document.createElement("article");
  article.setAttribute('class', "bgded ");
  article.style.backgroundImage = "url(" + imageUrl + ")";
  var div = document.createElement("div")
  div.setAttribute('class', "txtwrap");

  var h6 = document.createElement('h6');
  h6.innerHTML = title;
  var p = document.createElement('p');
  p.innerHTML = "<br>" + description + "<br><br><br>";
  var footer = document.createElement("footer");

  var more = document.createElement('a');
  // more.setAttribute('href', '');
  more.setAttribute('class', "char-btn")
  more.setAttribute("data-name", heroID)
  more.innerHTML = "More &raquo;";
  div.appendChild(h6);
  div.appendChild(p);
  footer.appendChild(more);
  article.appendChild(div);
  article.appendChild(footer);
  li.appendChild(article);
  document.querySelector('#infinite-charlist').appendChild(li);
}//printToPage



// infinite scroll section for comic Div
var listElm = document.querySelector('#infinite-comiclist');
// Add 20 items.
var nextItem = 0;
//var loadMore = function () 
var charId = "";
function loadMore(char) {
 // console.log("Value of char in LoadMore: " + char)
  // let charId = "1009610";
  charId = char;
  let newURL = marvURL + "characters/" + charId + "/comics?limit=6&offset=" + nextItem + apiAuth;
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
      // console.log("****THE Load more function****");
      // console.log(response);
      // // console.log(Object.keys(response).length);
      // console.log(response.data.results.length);
      // console.log( "Total Comics are: " +response.data.total);
      // // console.log(response.data.results[0].title);
      var totalComics = response.data.total;      // debuggin lines printing title to console.
      for (var i = 0; i < response.data.results.length; i++) {
        //console.log(response.data.results[i].title);
      }
      var firstCom = 0;
      for (var i = 0; i < response.data.results.length; i++) {
        var item = document.createElement('li');
        var cTitle = response.data.results[i].title;
        var cImg = response.data.results[i].thumbnail.path + "." + response.data.results[i].thumbnail.extension;
        var cId = response.data.results[i].id;
        var Cdescription = response.data.results[i].description
        item.innerText = 'Title ' + response.data.results[i].title;
        //listElm.appendChild(item);
        //console.log("Comic Image: " + response.data.results[i].thumbnail.path + "." + response.data.results[i].thumbnail.extension);

        var li = document.createElement('li');
        (firstCom == 0) ? li.setAttribute('class', 'one_third first comic-btn') :
          (firstCom == 3) ? (li.setAttribute('class', 'one_third first comic-btn'), firstCom = 0) : li.setAttribute('class', 'one_third  comic-btn');
        firstCom++

        //li.setAttribute('class','one_third  comic-btn') ;        

        li.setAttribute("data-name", cId);
        var article = document.createElement("article");
        article.setAttribute('class', "bgded ");
        article.style.backgroundImage = "url(" + cImg + ")";
        var div = document.createElement("div")
        div.setAttribute('class', "txtwrap");

        var h6 = document.createElement('h6');
        h6.innerHTML = cTitle;
        var p = document.createElement('p');
        p.innerHTML = "<br> <br><br><br><br><br><br><br><br><br>";
        var footer = document.createElement("footer");

        var more = document.createElement('a');
        // more.setAttribute('href', '');
        more.setAttribute('class', "comic-btn")
        more.setAttribute("data-name", cId)
        more.innerHTML = "More &raquo;";
        div.appendChild(h6);
        div.appendChild(p);
        footer.appendChild(more);
        article.appendChild(div);
        // article.appendChild(footer);
        li.appendChild(article);
        document.querySelector('#infinite-comiclist').appendChild(li);
      }
      nextItem += 7;
      // console.log("The Value of nextItem :" + nextItem);
    });
}
// Detect when scrolled to bottom.
listElm.addEventListener('scroll', function () {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    //   console.log("Cahr Id in Scroll: " + charId );
    loadMore(charId);
    //  console.log("Calliing more comics")
  }
});



var auth2;

/**
 * Initializes the Sign-In client.
 */
var initClient = function () {
  gapi.load('auth2', function () {
    /**
     * Retrieve the singleton for the GoogleAuth library and set up the
     * client.
     */
    auth2 = gapi.auth2.init({
      client_id: '735632269136-0nnk57dsj0pfu9q8tbd5a2gqva7425sb.apps.googleusercontent.com'
    });

    // Attach the click handler to the sign-in button
    auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
  });
};

/**
 * Handle successful sign-ins.
 */
var onSuccess = function (user) {
  console.log('Signed in as ' + user.getBasicProfile().getName());
};

/**
 * Handle sign-in failures.
 */
var onFailure = function (error) {
  console.log(error);
};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}