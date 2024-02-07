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
document.addEventListener("DOMContentLoaded", function() {
    
    const params = new URLSearchParams({
        page: 1,
        sort: "newest",
        api_key: "f0deb10a061285bd0b703a1bb091dbade8f4d9e8bbc868caff3376b916281bd9"
      }).toString();

var jobSearchRequest = `https://www.themuse.com/api/public/jobs?location=London%2C%20United%20Kingdom&${params}`;
// Call to return jobs from The Muse hardcoded to London & junior developer
fetch(jobSearchRequest)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        // showJobData(data);
        console.log(data.results);
        var jobListing = $("#job-listings");
    
        for (let i = 0; i < 10; i++) {
            const element = data.results[i];
            var div = $('<div>'); // Create carousel item
            var listItem = div.addClass("container")
            var cardHtml = '<div class="card bg-light text-dark p-5 mb-5 shadow p-3 mb-5 mt-4 bg-body rounded">'; // Card HTML
            cardHtml += '<h5 class="card1-title fs-4 fw-bold text-primary" id="job-title">' + element.name + '</h5>'; // Job title
            cardHtml += '<p class="recruiter-card1" id="recruiter-name1">'+ element.company.name +'</p>'; // Recruiter
            // cardHtml += '<p class="salary-card1 fw-bold" id="salary1"><i class="bi bi-cash"></i> £66,861 - £100,292 a year </p>'; // Salary
            cardHtml += '<p class="location-card1 fw-bold" id="location1"><i class="bi bi-geo-alt"></i>' + element.locations[0].name + ' or Flexible/Remote </p>'; // Location
            cardHtml += '<p class="partfull-card1 fw-bold" id="partfull-time1"><i class="bi bi-clock-history"></i> Full-Time </p>'; // Part/Full time
            cardHtml += '<p class="level-card1 fw-bold" id="seniority-level1"><i class="bi bi-bar-chart-line"></i> Senior Level </p>'; // Seniority level
            cardHtml += '<a href="#readmore">Job Description</a>'; // Job description link
            cardHtml += '<div id="readmore">'; // Read more section
            cardHtml += '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, eos odio aperiam perspiciatis vero molestias fuga. Numquam labore veniam ab sunt vitae fugiat, quam praesentium veritatis aspernatur tempore laboriosam cum! Exercitationem modi at nesciunt aperiam voluptatem quaerat doloremque nulla temporibus unde vitae magni odit, accusamus rem voluptas iste provident tempora!</p>'; // Dummy content
            cardHtml += '</div>'; // End of read more section
            cardHtml += '</div>'; // End of card
            listItem.html(cardHtml); // Set HTML content of carousel item
            jobListing.append(listItem); // Append carousel item to carousel inner
    
        }

    })


var searchButton = $("#search-btn");
var savedSearches = [];


    searchButton.on("click", function (event) {
        event.preventDefault();
        var jobInput = $("#job-search").val().trim();
        var locInput = $("#location-search").val().trim();

        // Present an error message if job title search is missing
        if (jobInput === "") {
            $("#empty-input").modal("show");
            return

        }
        // Save user input to local storage so that past seraches can be retrieved
        if ($("#save-search").prop("checked")) {
            savedSearches.push({ job: jobInput, location: locInput });
            localStorage.setItem('searches', JSON.stringify(savedSearches));
            console.log(savedSearches)
        }
    });
});