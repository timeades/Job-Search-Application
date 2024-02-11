document.addEventListener("DOMContentLoaded", function () {
  var API_KEY = "AIzaSyASDiHIn9V4EDItkPiC0eI5OVHikkj8az8"; // youtube API KEY to retrieve video data

  var searchButton = $("#search-btn");
  var clearButton = $("#clear-btn")
  var isColumnExpanded = false;
  var savedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
  if (savedCards.length > 0) {
    $("#row-two").show(); // Show the #row-two element if there are saved cards
  }


  // Retrieve saved searches from local storage
  var savedSearch = JSON.parse(localStorage.getItem("search")) || {};

    //Delete saved card listings
    clearButton.on("click", function(){
      localStorage.removeItem("savedCards");
      $("#row-two").toggle()
      $("#saved-listings").empty();
    })

  // Set default input values if saved
  if (savedSearch.job && savedSearch.location) {
    $("#job-search").val(savedSearch.job);
    $("#location-search").val(savedSearch.location);
  }


// Populate any saved cards to the saved searches bar
  function populateSaves() {
    var savedCards = JSON.parse(localStorage.getItem("savedCards")) || []; // Retrieve saved cards from local storage
    var savedListingsSection = $("#saved-listings"); // Select the section where saved listings will be appended

    // Clear existing content in the saved listings section
    savedListingsSection.empty();

    savedCards.forEach(function(cardHtml) {
      // Convert cardHtml string to jQuery object
      
      var card = $(cardHtml);
     
      // Remove elements with "description" class and "save-card" class
      card.find('.description').remove(); // Remove elements with "description" class
      card.find('.save-card').remove(); // Remove elements with "save-card" class
  
      // Append modified card HTML to the saved listings section
      savedListingsSection.append(card);

    });
    savedListingsSection.find('.container').addClass('saved-mini')
  }

  searchButton.on("click", function (event) {
    event.preventDefault();
    var jobInput = $("#job-search").val().trim();
    var locInput = $("#location-search").val().trim();
 

    // Present an error message if job title search is missing
    if (jobInput === "") {
      $("#empty-input").modal("show");
      return;
    }
    if (!isColumnExpanded) {
      $("#vid-column").removeClass("d-none").animate({ width: '30%' }, 500);
  
      isColumnExpanded = true;
    }
  

    // Save user input to local storage so that past searches can be retrieved
    if ($("#save-search").prop("checked")) {
      var newSearch = { job: jobInput, location: locInput };
      localStorage.setItem("search", JSON.stringify(newSearch));
    }

    // Variable to collect youtube video + api key + jobinput from the user
    var youtubevideoRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" +
      API_KEY +
      "&type=video&q=" +
      jobInput +
      "interview" +
      "questions&answers" +
      "most&Popular"
      "&maxResults=5&order=date&video";

    // fetch request to go and retrieve video from youtube database
    // fetch(youtubevideoRequest)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   // function to collect specific data information from youtube using dot notation for each job interview
    //   .then(function (data) {
    //     console.log(data);
    //     const videoIframe = document.querySelector(".videoPlayer");
    //     const videoTitle = document.querySelector(".videoTitle");
    //     const videoCaption = document.querySelector(".videoCaption");
    //     var currentuserVideo = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
    //     videoIframe.setAttribute("src", currentuserVideo);
    //     videoTitle.textContent = data.items[0].snippet.title;
    //     videoCaption.textContent = data.items[0].snippet.description;
    //   });

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
        var jobListing = $("#job-listings");
        // Clear existing job listings
        jobListing.empty();
        // var placeholder = document.getElementById("placeholder-icon");
        // placeholder.remove(); // Removes the div with the 'div-02' id

        for (let i = 0; i < 10; i++) {
          const element = data.results[i];

          var div = $("<div>"); // Create list of career cards
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
            "<p class='description'><small>" +
            truncateText(element.jobDescription, 500) +
            "</p>"; // Dummy content truncated to 500 characters
          cardHtml +=
            '<a href="' +
            element.jobUrl +
            '" class="btn btn-primary" role="button">Apply Now! 🚀</a>'; // Job description link
          cardHtml += `<button class="mx-2 btn btn-success save-card ">Save</button>`; // New button
          cardHtml += "</div>";

          listItem.html(cardHtml);
          jobListing.append(listItem);
        }

        // Handle click event of the "Save" button
        $(".save-card").on("click", function () {
          var cardHtml = $(this).closest(".container")[0].outerHTML;
          var savedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
          savedCards.push(cardHtml);
          localStorage.setItem("savedCards", JSON.stringify(savedCards));
          $("#row-two").show();
          $("#saved-a-card").modal("show");
          populateSaves();
          
        });

        function truncateText(text, maxLength) {
          if (text.length > maxLength) {
            return text.substring(0, maxLength) + "..."; // Truncate text if it exceeds maxLength
          } else {
            return text; // Return original text if it's within maxLength
          }
        }
      })

      populateSaves()
    
 

      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  });
       // Call populateSaves function when the document is loaded
       
       populateSaves();
       
});
