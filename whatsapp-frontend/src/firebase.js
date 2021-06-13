import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA9BV97OXZAHRSY4XfB0Z4YDW2uVPyi10w",
    authDomain: "whatsapp-login-c6e5a.firebaseapp.com",
    projectId: "whatsapp-login-c6e5a",
    storageBucket: "whatsapp-login-c6e5a.appspot.com",
    messagingSenderId: "337418016986",
    appId: "1:337418016986:web:2f4110bafbf0f02ed4ede3",
    measurementId: "G-TR5CY0W0P6"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };