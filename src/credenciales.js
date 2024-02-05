// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr6WIbIucjZIR7gwI37YL-dEbs2pgJVVI",
  authDomain: "henrygrupo5pf-36b42.firebaseapp.com",
  projectId: "henrygrupo5pf-36b42",
  storageBucket: "henrygrupo5pf-36b42.appspot.com",
  messagingSenderId: "775745191380",
  appId: "1:775745191380:web:663da01e3a428f089b2a41"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;