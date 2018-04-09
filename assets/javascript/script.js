
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

  $("#comics").append(comicDiv);

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
