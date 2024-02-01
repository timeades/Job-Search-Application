// // javascript file for the project
// var holdingVideoRequest = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBnDmExHOJTJnXSnZ6fXmQEhVeFXQeqe7c&type=video&q=intervew preperation&maxResults=5&order=date&video';

// // Call to return videos from youtube for interview preperation tips which could be the holding image
// fetch(holdingVideoRequest) 
// .then(function(response) {
//     return response.json();
// })
// .then(function (holdingVideoData) {
//     console.log(holdingVideoData);
// })


// // this request will be update to include the search term from the user eg q=intervew preperation for + user input';
// var videoRequest = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBnDmExHOJTJnXSnZ6fXmQEhVeFXQeqe7c&type=video&q=intervew preperation for junior developer&maxResults=5&order=date&video';
// // Call to return videos from youtube for interview preperation for junior developer
// fetch(videoRequest) 
// .then(function(response) {
//     return response.json();
// })
// .then(function (videoData) {
//     console.log(videoData);
// })

var jobSearchRequest = 'https://www.themuse.com/api/public/jobs?category=Computer%20and%20IT&category=Science%20and%20Engineering&category=Software%20Engineer&category=Software%20Engineering&level=Entry%20Level&level=Mid%20Level&level=Senior%20Level&level=management&level=Internship&location=London%2C%20United%20Kingdom&page=1&descending=true';
// Call to return jobs from The Muse hardcoded to London & junior developer
fetch(jobSearchRequest)
.then(function(response) {
    return response.json();
})
.then(function (jobData) {
    console.log(jobData);
})