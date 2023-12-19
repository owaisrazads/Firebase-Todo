//import all item

import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db} from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 



const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const userName = document.querySelector('#names')

//create user signup

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
    const user = userCredential.user;

    //add docs or data bhejwa rhy hn
    
    try {
        const docRef = await addDoc(collection(db, "users"), {
          names: userName.value,
          email: email.value,
          password: password.value,
          uid: user.uid
    });
    
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    window.location = 'login.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
})


