import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDm1JHPqrDgqA8vwsH89LJa-FT6SNK9KUU",
    authDomain: "owaisds-todo.firebaseapp.com",
    projectId: "owaisds-todo",
    storageBucket: "owaisds-todo.appspot.com",
    messagingSenderId: "590222794495",
    appId: "1:590222794495:web:04e510a1fc66471409f6ca",
    measurementId: "G-GG2L656E17"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);