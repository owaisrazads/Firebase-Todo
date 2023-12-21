//import all item

import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'




const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const userName = document.querySelector('#names')
const img = document.querySelector('#img')


//create user signup

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          const file = img.files[0]
          const storageRef = ref(storage, email.value);
          uploadBytes(storageRef, file).then(() => {
              getDownloadURL(storageRef).then((url) => {
                  addDoc(collection(db, "user"), {
                      name: name.value,
                      email: email.value,
                      uid: user.uid,
                      profileUrl: url
                  }).then((res) => {
                      console.log(res);
                      window.location = 'index.html'
                  }).catch((err) => {
                      console.log(err);
                  })
              })
          });

      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert(errorCode)
          register.innerHTML = "Register"
      });


});

