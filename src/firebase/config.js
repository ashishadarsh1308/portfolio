// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPCETL_LxLyVauUA2BrAXnRqAdml2ws4w",
    authDomain: "fir-tut-41561.firebaseapp.com",
    projectId: "fir-tut-41561",
    storageBucket: "fir-tut-41561.firebasestorage.app",
    messagingSenderId: "511225268284",
    appId: "1:511225268284:web:2cbc52493d72c80be2db39",
    measurementId: "G-GF51RDZ70D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);