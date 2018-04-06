import firebase from 'firebase'
//Initialize Firebase
var config = {
    apiKey: "AIzaSyAUrcXbYLxpuU8QJwUQmZ_lz72SYNrPEGQ",
    authDomain: "too-doo-list.firebaseapp.com",
    databaseURL: "https://too-doo-list.firebaseio.com",
    projectId: "too-doo-list",
    storageBucket: "too-doo-list.appspot.com",
    messagingSenderId: "911760595712"
};
var Fire = firebase.initializeApp(config);
export default Fire;
