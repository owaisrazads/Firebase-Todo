import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db} from "./config.js";
import { collection, addDoc, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 

const form = document.querySelector('#form')
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const div = document.querySelector('#container')
const logout = document.querySelector('#logout')


let userUid;
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      userUid = uid;
      renderTodo(uid)
    } else {
      console.log(errorMessage);
      window.location = 'login.html'
  
    }
  });

  //add data firestore

form.addEventListener('submit', async(event)=>{
    event.preventDefault()
   try {
  const docRef = await addDoc(collection(db, "posts"), {
    title: title.value,
    description: description.value,
    uid: auth.currentUser.uid,
    timestamp: Timestamp.fromDate(new Date())
  });
  console.log("Document written with ID: ", docRef.id);
  renderTodo(uid);
} catch (e) {
  console.error("Error adding document: ", e);
}
})


//get data from firestore

async function renderTodo(uid){
  let arr = [];
const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
  arr.push(doc.data())
});
div.innerHTML = ''
console.log(arr);
arr.map((item)=>{
    div.innerHTML += ` <h3>Title:${item.title}</h3>
    <h3>Description${item.description}</h3>
    <button id="deleteBtn">Delete</button>
    <button id="editBtn">Edit</button><hr>`
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