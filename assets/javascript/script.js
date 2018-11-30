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

    // To do: rearrange text in job info modal
    // create dynamic variable (see line 81)
    // find way to delete job postings by user login.
    // have separate div to show entries user has posted
    
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
        var modalTitle = childSnapshot.val().title;
        var modalLocation =  childSnapshot.val().location;
        var modalCompany = childSnapshot.val().company;
        var modalTime = childSnapshot.val().time;
        var modalDescription = childSnapshot.val().description;
        var modalContact = childSnapshot.val().contact;
        var modalLink = $(`<a href='${childSnapshot.val().link}'>For more info</a>`);



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
            // ?Possible to create variable on the condition that address value !== undefined.
            // If no specific address is given in input field, use location input 
            // Or find way to make input field required
           
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
  // CREATE A REFERENCE TO FIREBASE
  var messagesRef = new Firebase('https://ctu00d06e16.firebaseio-demo.com/');
  // REGISTER DOM ELEMENTS
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('#example-messages');
  // LISTEN FOR KEYPRESS EVENT
  messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = nameField.val();
      var message = messageField.val();
      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      messagesRef.push({name:username, text:message});
      messageField.val('');
    }
  });

  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(2).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;
    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(username);
    messageElement.text(message).prepend(nameElement);
    //ADD MESSAGE
    
    messageList.append(messageElement)
    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });


  // Kat's Code End





});

