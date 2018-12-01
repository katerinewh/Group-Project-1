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
    // find way to delete job postings.
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
        var addressSnapshot = childSnapshot.val().address || childSnapshot.val().location;
        var modalTitle = childSnapshot.val().title;
        var modalLocation = childSnapshot.val().location;
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
            database.ref("/chat").push({ name: username, text: message });
            messageField.val('');
        }
    });
    // Add a callback that is triggered for each chat message.
    database.ref("/chat").on('child_added', function (childSnapshot) {
        //GET DATA
        var data = childSnapshot.val()
        var username = data.name || "anonymous";
        var message = data.text;
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var messageElement = $("<p>");
        var nameElement = $("<strong class='example-chat-username'></strong>")
        nameElement.text(username + ": ");
        messageElement.text(message).prepend(nameElement);
        //ADD MESSAGE
        messageList.append(messageElement)
        //SCROLL TO BOTTOM OF MESSAGE LIST
        messageList[0].scrollTop = messageList[0].scrollHeight;
    });


    // Kat's Code End

    // Ghaidan's js below




    var questionInput = "";

    var answerArray =

        $("#add-question-btn").on("click", function (e) {
            e.preventDefault();
            var questionInput = $("#question-input").val().trim();


            // console.log(questionInput);

            database.ref().push({
                questionInput: questionInput,
                answerArray: []
            });


        });

    database.ref().on("child_added", function (snap) {
        console.log(snap.val().questionInput);
        var card = $("<div class='card' data-toggle='modal' data-target='#exampleModal'>");
        card.attr('data-question', snap.val().questionInput)
        card.attr('data-key', snap.key)
        card.append(snap.val().questionInput);
        $("#qa-card").append(card);
    })

    var key

    $(document).on('click', '.card', function (event) {

        var question = event.target.dataset.question
        key = event.target.dataset.key
        $('.modal-title').html(question)
        $(".answers").empty();
        database.ref('/' + key + '/answers').once("value", function (snap) {
            console.log(database);
            // for
            var answerObj = snap.val();
            for (var key in answerObj) {
                var newAnswer = $('<p>')
                newAnswer.text(answerObj[key].answer);
                $('.answers').append(newAnswer)

            }


        })
    })


    $('.answer-question').on('submit', function (event) {
        event.preventDefault()
        var answer = $('#answer').val()
        var newAnswer = $('<p>')
        newAnswer.text(answer);
        $('.answers').append(newAnswer)

        database.ref('/' + key + '/answers').push({
            answer: answer
        })
        console.log(key);
        $('.answer-question')[0].reset();
    });
})
// Ghaidan's js above