
// Call to return videos from youtube
fetch(youtubevideoRequest)
.then(function(response) {
    return response.json();
var currentuserVideo = `https://www.youtube.com/embed/${data.items[0].id.videoId}`
    videoIframe.setAttribute("src",currentuserVideo)

})
.then(function (youtubevideoRequest) {
    console.log(youtubevideoRequest);
})


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
    var searchButton = $("#search-btn");
    var savedSearches = [];

    searchButton.on("click", function (event) {
        event.preventDefault();
        var jobInput = $("#job-search").val().trim();
        var locInput = $("#location-search").val().trim();

        // Present an error message if job title search is missing
        if (jobInput === "") {
            $("#empty-input").modal("show");
            return;
        }

        // Save user input to local storage so that past searches can be retrieved
        if ($("#save-search").prop("checked")) {
            savedSearches.push({ job: jobInput, location: locInput });
            localStorage.setItem('searches', JSON.stringify(savedSearches));
            console.log(savedSearches);
        }

        // Perform fetch request based on user input
        const params = new URLSearchParams({
            page: 1,
            sort: "newest",
            api_key: "f0deb10a061285bd0b703a1bb091dbade8f4d9e8bbc868caff3376b916281bd9"
        }).toString();

        var jobSearchRequest = `https://www.themuse.com/api/public/jobs?location=${locInput}&${params}`;

        fetch(jobSearchRequest)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // showJobData(data);
                console.log(data.results);
                var jobListing = $("#job-listings");

                // Clear existing job listings
                jobListing.empty();

                for (let i = 0; i < 10; i++) {
                    const element = data.results[i];
                    var div = $('<div>'); // Create carousel item
                    var listItem = div.addClass("container")
                    var cardHtml = '<div class="card bg-light text-dark p-1 mb-5 shadow p-3 mb-5 mt-4 bg-body rounded">'; // Card HTML
                    cardHtml += '<h5 class="card1-title fs-4 fw-bold text-primary" id="job-title">' + element.name + '</h5>'; // Job title
                    cardHtml += '<p class="recruiter-card1" id="recruiter-name1">'+ element.company.name +'</p>'; // Recruiter
                    // cardHtml += '<p class="salary-card1 fw-bold" id="salary1"><i class="bi bi-cash"></i> £66,861 - £100,292 a year </p>'; // Salary
                    if (locInput !== "") {
                        cardHtml += '<p class="location-card1 fw-bold" id="location1"><i class="bi bi-geo-alt"></i> ' + locInput + ', United Kingdom or Flexible/Remote </p>'; // Location updated to append <br> if locInput is not empty
                    } else {
                        cardHtml += '<p class="location-card1 fw-bold" id="location1"><i class="bi bi-geo-alt"></i>Flexible/Remote </p>'; // Location without <br> if locInput is empty
                    }
                    cardHtml += '<p class="level-card1 fw-bold" id="seniority-level1"><i class="bi bi-bar-chart-line"></i> '+ element.levels[0].name +'</p>'; // Seniority level
                    cardHtml += '<p><small>' + truncateText(element.contents, 500) + '</p>'; // Dummy content truncated to 500 characters
                    cardHtml += '<a href="'+element.refs.landing_page + '" class="btn btn-primary" role="button">Apply Now! 🚀</a>'; // Job description link
                    cardHtml += '</div>'; // End of card
                    listItem.html(cardHtml); // Set HTML content of carousel item
                    jobListing.append(listItem); // Append carousel item to carousel inner
                }
                
                function truncateText(text, maxLength) {
                    if (text.length > maxLength) {
                        return text.substring(0, maxLength) + "..."; // Truncate text if it exceeds maxLength
                    } else {
                        return text; // Return original text if it's within maxLength
                    }
                }
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    });
});
