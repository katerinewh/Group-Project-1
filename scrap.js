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