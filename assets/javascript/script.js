$(document).ready(function () {



    var config = {
        apiKey: "AIzaSyAakeEevKf-1RdnnBLDYpcOSZT9sVEoE8o",
        authDomain: "group-project-firebase.firebaseapp.com",
        databaseURL: "https://group-project-firebase.firebaseio.com",
        projectId: "group-project-firebase",
        storageBucket: "group-project-firebase.appspot.com",
        messagingSenderId: "423956817562"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#post-btn").on("click", function (event) {

        event.preventDefault();
        // Creates variables for every input field
        var titleInput = $("#title-input").val();
        var locationInput = $("#location-input").val();
        var timeInput = $("#time-input").val();
        var descriptionInput = $("#description-input").val();
        var linkInput = $("#link-input").val();
        // Takes link input and prepends https:// if not included in input
        var linkText = (linkInput.indexOf('://') === -1) ? 'http://' + linkInput : linkInput;
        var contactInput = $("#contact-input").val();

        // pushes input data to firebase under job-listing folder
        database.ref("/job-listing").push({
            title: titleInput,
            location: locationInput,
            time: timeInput,
            description: descriptionInput,
            link: linkText,
            contact: contactInput
        });

    });

    database.ref("/job-listing").on("child_added", function (childSnapshot) {

        // Creates a button everytime user submits a job labeled 
        var jobBtn = $("<div>" + childSnapshot.val().title + "</div>");
        $("#job-links-display").append(jobBtn);
        jobBtn.attr("id", "job-btn");
        jobBtn.append("<p>"+childSnapshot.val().location+"</p>");

        var modalTitle = $("<h1>" + childSnapshot.val().title + "</h1>");
        var modalLocation = $("<p>" + childSnapshot.val().location + "</p>");
        var modalTime = $("<p>" + childSnapshot.val().time + "</p>");
        var modalDescription = $("<p>" + childSnapshot.val().description + "<p>");
        var modalContact = $("<p>" + childSnapshot.val().contact+"</p>");
        var modalLink = $(`<p><a href='${childSnapshot.val().link}'>For more info</a></p>`);

        // When user clicks on job listing 
        jobBtn.on("click", function (event) {
            event.preventDefault();
            var emptyModal = $("#job-info-modal");
            emptyModal.modal('show');


            var jobHeaderSpan = $(".modal-header-div");
            var jobLocationSpan = $("#location-span")
            var jobTypeSpan = $("#job-type-span");
            var jobDescriptionSpan = $("#description-span");
            var jobContactSpan = $("#contact-span");
            var jobLinkSpan = $("#link-span");

            jobHeaderSpan.html(modalTitle);
            jobLocationSpan.html(modalLocation);
            jobTypeSpan.html(modalTime);
            jobDescriptionSpan.html(modalDescription);
            jobContactSpan.html(modalContact);
            jobLinkSpan.html(modalLink);

        });


    });







});