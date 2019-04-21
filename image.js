

var config = {
    apiKey: "AIzaSyBJc-3Xt10uoWNZOoRSAR07b1Q_guZyIYo",
    authDomain: "evil-8b1f7.firebaseapp.com",
    databaseURL: "https://evil-8b1f7.firebaseio.com",
    projectId: "evil-8b1f7",
    storageBucket: "evil-8b1f7.appspot.com",
    messagingSenderId: "327567436214"
};
firebase.initializeApp(config);

console.log("init")
firebase.database().ref("/capture").on('value', function(snapshot) {
    images = Object.values(snapshot.val());
    for (var i=0; i < images.length; i++) {
        console.log(i);
        console.log(images[i].capture);
        document.getElementById("image"+i)["src"] = images[i].capture;
        document.getElementById("image"+i)["style"] = "visibility:display; border:red 5px;";
    }
});