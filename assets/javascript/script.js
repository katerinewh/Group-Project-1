
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAF-QwmxCwFtt4nG9dbHSK0R1wAayP0q1c",
  authDomain: "fir-chat-application-3056a.firebaseapp.com",
  databaseURL: "https://fir-chat-application-3056a.firebaseio.com",
  projectId: "fir-chat-application-3056a",
  storageBucket: "fir-chat-application-3056a.appspot.com",
  messagingSenderId: "870161544825"
};
firebase.initializeApp(config);




function loginNew() {
  var email=$("#email").val().trim();
  var password=$("#password").val().trim();
  // Log the user in via Firebase
  var provider = new firebase.auth();
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
function signOut(){
  // Sign out user
  firebase.auth().signOut()
    .catch(function (err) {
    console.log (err)
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
