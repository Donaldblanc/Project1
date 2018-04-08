$(document).ready(function () {

    var movies = ["Howard the Duck",
        "The Punisher ",
        "Captain America",
        "The Fantastic Four (1994)",
        "Blade",
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

    function displayMovieInfo() {

        for (var i = 0; i < movies.length; i++) {

            var movie = movies[i];
            var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            // var queryURL1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=CaptainAmericatrailer&key=AIzaSyC8th4wDxjLmTn1fONnkSMaUaGAGTUNQRA"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {


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

            });
            localStorage.setItem("movie" + i, movies[i]);
            localStorage.setItem("movies", JSON.stringify(movies));
        }
    }


    displayMovieInfo();

    $("#movie_id").on("click", function () {
        alert("click");
        character_array();
    })
    
    function character_array() {

        var movie_ID = $(this).val();
        // console.log(movie_ID);
        var queryURL2 = "https://api.themoviedb.org/3/movie/"+ movie_ID +"/credits?api_key=cf7b01cd6ffa681f8ced55fe3eac526f";
        var char_array = [];
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response_char) {
            // console.log(response_char);
            // console.log(response_char.cast);
            for (i = 0 ; i < 10 ; i++){
                char_array.push(response_char.cast[i]);
            }
            console.log(char_array);

        });
    }
})