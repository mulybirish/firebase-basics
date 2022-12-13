import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUPBafQdNxA17i_jui9Lr0YNvqaaCi4tM",
  authDomain: "fir-tutorial-d23a4.firebaseapp.com",
  projectId: "fir-tutorial-d23a4",
  storageBucket: "fir-tutorial-d23a4.appspot.com",
  messagingSenderId: "853962297028",
  appId: "1:853962297028:web:0b341ba258ffb6466e4391",
};
// initialize firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// queries                    // condition
const q = query(colRef, orderBy("createdAt")); //  < ר
//   |
//     |
// get real time collection data / real time query              |
// |
onSnapshot(q, (snapshot) => {
  const books = []; //|
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id }); //|
  });
  console.log(books); // logs all the books written by God    ^
  //    |
  //    |
});

// get real time collection data

// onSnapshot(colRef, (snapshot) => {
//   const books = [];
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(books);
// });

// *** get collection data ***
// getDocs(colRef)
//   .then((snapshot) => {
//     const books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// adding a document
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});
// deleting a document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get a single document
const docRef = doc(db, "books", "SeWzgRrQzMwNEvwrSvQ7");
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, {
    title: "mulugeta birish",
  }).then(() => {
    updateForm.reset();
  });
});
