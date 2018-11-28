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
        var titleInput = $("#title-input").val();
        var locationInput = $("#location-input").val();
        var timeInput = $("#time-input").val();
        var descriptionInput = $("#description-input").val();
        var linkInput = $("#link-input").val();
        var contactInput = $("#contact-input").val();

        database.ref("/job-listing").push({
            title: titleInput,
            location: locationInput,
            time: timeInput,
            // part-time = 1
            // full-time = 2
            description: descriptionInput,
            link: linkInput,
            contact: contactInput
        });

    });

    database.ref("/job-listing").on("child_added", function (childSnapshot) {

        var jobBtn = ("<button>"+childSnapshot.val().title+"</button>");
        $("#job-links-display").append(jobBtn);

        // $("#job-info-content").text(childSnapshot.val().title);

        jobBtn.on("click", function (event) {
            event.preventDefault();
            console.log("Button Works");

        });

    });







});