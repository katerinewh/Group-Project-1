
// Initialize Firebase
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


// button on-click event
$("#send-user-info").on("click", function(){
  loginNew();
});
function loginNew() {
  var email=$("#email").val().trim();
  var password=$("#password").val().trim();
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
