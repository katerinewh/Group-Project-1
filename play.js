var config = {
    apiKey: "AIzaSyCR0pwhs9fvTAcArase26AwpgqAFlWPVMA",
    authDomain: "test1-2aa27.firebaseapp.com",
    databaseURL: "https://test1-2aa27.firebaseio.com",
    projectId: "test1-2aa27",
    storageBucket: "",
    messagingSenderId: "588751070149"
};
firebase.initializeApp(config);


var database = firebase.database();


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
        console.log(snap.val());
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

    database.ref('/' + key + '/answers').push({
        answer: answer
    })
    console.log(key);
    $('.answer-question')[0].reset()
})
