// Initialize Firebase
var config = {
	apiKey: "AIzaSyDRo-tdOk_wniBWQ",
    authDomain: "html-q-demo.firebaseapp.com",
    databaseURL: "https://html-q-demo.firebaseio.com",
    storageBucket: "html-q-demo.appspot.com",
    messagingSenderId: "558977"
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();