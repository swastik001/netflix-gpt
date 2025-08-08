// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE1KMX3-UHZS0IFS_YyJUlwoJneVv0u-c",
  authDomain: "netflixgpt-9ae35.firebaseapp.com",
  projectId: "netflixgpt-9ae35",
  storageBucket: "netflixgpt-9ae35.firebasestorage.app",
  messagingSenderId: "1024972734917",
  appId: "1:1024972734917:web:c2bc23e2636d6c3a814bac",
  measurementId: "G-6Y679VLK4N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
