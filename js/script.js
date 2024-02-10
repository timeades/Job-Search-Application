// Call to return videos from youtube
// fetch(youtubevideoRequest)
// .then(function(response) {
//     return response.json();
// var currentuserVideo = `https://www.youtube.com/embed/${data.items[0].id.videoId}`
//     videoIframe.setAttribute("src",currentuserVideo)

// })
// .then(function (youtubevideoRequest) {
//     console.log(youtubevideoRequest);
// })

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
document.addEventListener("DOMContentLoaded", function () {
  var API_KEY = "AIzaSyDJ_TtYRKTEfGXOpPfSva8_f83j5yPAeN4"; // youtube API KEY to retrieve video data

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
      localStorage.setItem("searches", JSON.stringify(savedSearches));
      console.log(savedSearches);
    }

    // Variable to collect youtube video + api key + jobinput from the user
    var youtubevideoRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
      API_KEY +
      "&type=video&q=" +
      jobInput + "interview" + "questions&answers" +
      "&maxResults=5&order=date&video";

    // fetch request to go and retrieve video from youtube database
    fetch(youtubevideoRequest)
      .then(function (response) {
        return response.json();
      })
    // function to collect specific data information from youtube using dot notation for each job interview
      .then(function (data) {
        console.log(data);
        const videoIframe = document.querySelector(".videoPlayer");
        var currentuserVideo = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
        videoIframe.setAttribute("src", currentuserVideo);
      });



    // Perform fetch request based on user input
    // const params = new URLSearchParams({
    //     page: 1,
    //     sort: "newest",
    //     catagory: jobInput,
    //     api_key: "f0deb10a061285bd0b703a1bb091dbade8f4d9e8bbc868caff3376b916281bd9"
    // }).toString();

    // var jobSearchRequest = `https://www.themuse.com/api/public/jobs?${params}`;
    // Perform fetch request based on user input
    var reedAPI = "64e50c34-0640-453a-952d-41d13cbff2c3";
    var headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(reedAPI + ":"));

    var jobSearchRequest;
    if (locInput === "") {
      jobSearchRequest = `https://www.reed.co.uk/api/1.0/search?keywords=${jobInput}&resultsToTake=10`;
    } else {
      jobSearchRequest = `https://www.reed.co.uk/api/1.0/search?keywords=${jobInput}&locationName=${locInput}&resultsToTake=10`;
    }
    var jobInput = $("#job-search").val().trim();
    var jobListing = $("#job-listings");
    fetch(jobSearchRequest, {
      method: "GET",
      headers: headers,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.results);

        // Clear existing job listings
        jobListing.empty();

        for (let i = 0; i < 10; i++) {
          const element = data.results[i];
          var div = $("<div>"); // Create carousel item
          var listItem = div.addClass("container");
          var cardHtml =
            '<div class="card bg-light text-dark p-1 mb-5 shadow p-3 mb-5 mt-4 bg-body rounded">'; // Card HTML
          cardHtml +=
            '<h5 class="card1-title fs-4 fw-bold text-primary" id="job-title">' +
            element.jobTitle +
            "</h5>"; // Job title
          cardHtml +=
            '<p class="recruiter-card1" id="recruiter-name1">' +
            element.employerName +
            "</p>"; // Recruiter
          // cardHtml += '<p class="salary-card1 fw-bold" id="salary1"><i class="bi bi-cash"></i> £66,861 - £100,292 a year </p>'; // Salary
          // if (locInput !== "") {
          cardHtml +=
            '<p class="location-card1 fw-bold" id="location1"><i class="bi bi-geo-alt"></i> ' +
            element.locationName +
            "</p>"; // Location updated to append <br> if locInput is not empty
          // } else {
          //     cardHtml += '<p class="location-card1 fw-bold" id="location1"><i class="bi bi-geo-alt"></i>Flexible/Remote </p>'; // Location without <br> if locInput is empty
          // }
          if (element.minimumSalary !== null) {
            cardHtml +=
              '<p class="salary-card1 fw-bold" id="salary1"><i class="bi bi-cash"></i> £' +
              element.minimumSalary +
              " - £" +
              element.maximumSalary +
              "</p>";
          }
          cardHtml +=
            '<p class="fw-bold"><i class="bi bi-clock-history"></i> Apply by: ' +
            element.expirationDate +
            " </p>";
          cardHtml +=
            "<p><small>" + truncateText(element.jobDescription, 500) + "</p>"; // Dummy content truncated to 500 characters
          cardHtml +=
            '<a href="' +
            element.jobUrl +
            '" class="btn btn-primary" role="button">Apply Now! 🚀</a>'; // Job description link
          cardHtml += "</div>"; // End of card
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
        console.error("Error fetching data:", error);
      });
  });
});
