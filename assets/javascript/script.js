$(document).ready(function () {

    // Initialize Firebase
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

    // Alex code start
    $("#post-btn").on("click", function (event) {

        event.preventDefault();
        
        // Creates variables for every input field
        var titleInput = $("#title-input").val();
        var locationInput = $("#location-input").val();
        var addressInput = $("#address-input").val();
        var companyInput = $("#company-input").val();
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
            address: addressInput,
            company: companyInput,
            time: timeInput,
            description: descriptionInput,
            link: linkText,
            contact: contactInput
        });

        $('#job-modal').modal('toggle');
        $("#job-info-form").trigger("reset");

    });

    database.ref("/job-listing").on("child_added", function (childSnapshot) {

        // Creates a button everytime user submits a job labeled 
        var jobBtn = $("<div>" + childSnapshot.val().title + "</div>");
        $("#job-links-display").append(jobBtn);
        jobBtn.attr("id", "job-btn");
        jobBtn.append("<p>" + childSnapshot.val().location + "</p>");
        var addressSnapshot = childSnapshot.val().address;
        var modalTitle = $("<h1>" + childSnapshot.val().title + "</h1>");
        var modalLocation = $("<p>" + childSnapshot.val().location + "</p>");
        var modalCompany = $("<p>" + childSnapshot.val().company + "</p>");
        var modalTime = $("<p>" + childSnapshot.val().time + "</p>");
        var modalDescription = $("<p>" + childSnapshot.val().description + "<p>");
        var modalContact = $("<p>" + childSnapshot.val().contact + "</p>");
        var modalLink = $(`<p><a href='${childSnapshot.val().link}'>For more info</a></p>`);



        jobBtn.on("click", function (event) {
            event.preventDefault();
            var emptyModal = $("#job-info-modal");
            emptyModal.modal('show');
            var jobHeaderSpan = $(".modal-header-div");
            var jobCompanySpan = $("#company-span")
            var jobTypeSpan = $("#job-type-span");
            var jobDescriptionSpan = $("#description-span");
            var jobContactSpan = $("#contact-span");
            var jobLinkSpan = $("#link-span");
            // Possible to create variable on the condition that address value !== undefined.
            // 
            var googleMapsUrl = `https://www.google.com/maps/embed/v1/place?q=${addressSnapshot}&key=AIzaSyBSvWzj-nolifiqWXXRDit4tlhOKifsIAs`;
            
            $("#google-maps").attr('src', googleMapsUrl);

            jobHeaderSpan.html(modalTitle);
            jobCompanySpan.html(modalCompany);
            jobTypeSpan.html(modalTime);
            jobDescriptionSpan.html(modalDescription);
            jobContactSpan.html(modalContact);
            jobLinkSpan.html(modalLink);

        });

    });

    // Alex's code end






    // Kat's Code Start

    $("#send-user-info").on("click", function () {
        loginNew();
    });
    function loginNew() {
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        // Log the user in via Firebase
        // var provider = new firebase.auth();
        // firebase.auth().signInWithPopup(provider).catch(function(error) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function (err) {
                console.log("Error authenticating user:", error);
            });
    }
    // Sign in existing user
    function loginExistingUser() {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function (err) {
                // Handle errors
            });
    }
    function signOut() {
        // Sign out user
        firebase.auth().signOut()
            .catch(function (err) {
                console.log(err)
            });
    }
    firebase.auth().onAuthStateChanged(function (user) {
        // Once authenticated, instantiate Firechat with the logged in user
        if (user) {
            initChat(user);
        }
        // if (user) {
        //   // If the user is logged in, set them as the Firechat user
        //   chat.setUser(user.uid, "Anonymous" + user.uid.substr(10, 8));
        // } else {
        //   // If the user is not logged in, sign them in anonymously
        //   firebase.auth().signInAnonymously().catch(function(error) {
        //     console.log("Error signing user in anonymously:", error);
        //   });
        // }
    });

    function initChat(user) {
        // Get a Firebase Database ref
        var chatRef = firebase.database().ref("chat");

        // Create a Firechat instance
        var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

        // Set the Firechat user
        chat.setUser(user.uid, user.displayName);
    }

    // Kat's Code End






});
