import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA__ACPuuHAL-hClucKH-RG20MjTHR1Wzw",
  authDomain: "crud-react-firebase-todo-list.firebaseapp.com",
  projectId: "crud-react-firebase-todo-list",
  storageBucket: "crud-react-firebase-todo-list.appspot.com",
  messagingSenderId: "54283305390",
  appId: "1:54283305390:web:aa4206678a08aa9ec4883f",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
