import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

//check user login or logout

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location = home.html
    const uid = user.uid;
    // ...
  } else {
    console.log(errorMessage);

  }
});

//user signin

form.addEventListener('submit', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);

            window.location = 'home.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

})
