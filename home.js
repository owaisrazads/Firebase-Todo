import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.querySelector('#form')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const div = document.querySelector('#container')
const logout = document.querySelector('#logout')

//check user is login or not
let arr = [];
let userUid;
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    userUid = uid;
    const q = query(collection(db, "todos"), where("uid", "==", uid), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), docId: doc.id });
    });
    renderTodo()
  } else {
    window.location = 'login.html'
  }
});
//add data firestore

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title.value,
      description: description.value,
      uid: auth.currentUser.uid,
      timestamp: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    arr.unshift({
      title: title.value,
      description: description.value,
      uid: userUid,
      docId: docRef.id
    })
    renderTodo()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})


//function render todo
function renderTodo() {
  div.innerHTML = ''
  console.log(arr);
  arr.map((item) => {
    div.innerHTML += `<h1>Title: ${item.title}</h1>
    <h1>Description: ${item.description}</h1>
    <button id="deleteBtn">delete</button>
    <button id="updateBtn">update</button>
     `
  })

  //delete posts
  const deleteBtn = document.querySelectorAll('#deleteBtn')
  deleteBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      console.log('delete called', index);
    })
  })

  //delete posts
  const updateBtn = document.querySelectorAll('#updateBtn')
  updateBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      console.log('update called', index);
    })
  })


}





//logout function

logout.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = 'login.html'
  }).catch((error) => {
    console.log(error);
  });
})