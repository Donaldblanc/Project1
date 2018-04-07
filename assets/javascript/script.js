
// marvel API call 
// written in Vanilla Java script 

const apiAuth = "&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";
const marvURL = "https://gateway.marvel.com/v1/public/";
var charSearch = "characters?name=";
var name = "spider-man";



var queryURL = marvURL + charSearch + name + apiAuth;

// variable declaration

console.log(queryURL);

var test = " https://gateway.marvel.com/v1/public/characters?name=spider-man&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";

// function to get my ID
var getTheId = function (idname) {
  return document.querySelector(idname);
}


// builds the 
function buildQueryURL(name) {

console.log(name);

  var newURL = marvURL + charSearch + name + apiAuth;
  getQuery (newURL);
}

var searchButton = getTheId("#run-search");

searchButton.onclick = function (event) {
  var charName2 = document.getElementById("char-name").value;
  var charName = getTheId("#char-name").value.trim();
  buildQueryURL(charName);
 //console.log(" button working ");

};

// using the promise API native to Javascript specific the fetch API 
function getQuery (search){

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
        console.log(response.data.results[0].name)

      });

}//getQuery


// function printToPage(response)
// {
//   var title = response.rating;
//   var comicDiv = $("<div class='item'>");
//   var title = $("<h3>").text("Title: " + title);


// }//printToPage
