// javascript file for the project
var holdingVideoRequest = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBnDmExHOJTJnXSnZ6fXmQEhVeFXQeqe7c&type=video&q=intervew preperation&maxResults=5&order=date&video';

// Call to return videos from youtube for interview preperation tips which could be the holding image
fetch(holdingVideoRequest) 
.then(function(response) {
    return response.json();
})
.then(function (holdingVideoData) {
    console.log(holdingVideoData);
})


// this request will be update to include the search term from the user eg q=intervew preperation for + user input';
var videoRequest = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBnDmExHOJTJnXSnZ6fXmQEhVeFXQeqe7c&type=video&q=intervew preperation for junior developer&maxResults=5&order=date&video';
// Call to return videos from youtube for interview preperation for junior developer
fetch(videoRequest) 
.then(function(response) {
    return response.json();
})
.then(function (videoData) {
    console.log(videoData);
})




$(document).ready(function () {
    var searchButton = $("#search-btn");

    searchButton.on("click", function (event) {
        event.preventDefault();

        var jobInput = $("#search-input").val().trim();

        if (jobInput === "") {
            $("#empty-input").modal("show");
        }

        console.log("All okay");
    });
});