const firebaseConfig = {
  apiKey: "AIzaSyCMMMkdivJKVh7QanhW6uD_E82idKd19bg",
  authDomain: "eq-demo2.firebaseapp.com",
  projectId: "eq-demo2",
  storageBucket: "eq-demo2.appspot.com",
  messagingSenderId: "1092133774225",
  appId: "1:1092133774225:web:3615c0aa62da1603d4f030",
};

firebase.initializeApp(firebaseConfig);
var rootRef = firebase.database().ref();
