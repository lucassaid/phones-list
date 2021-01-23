import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwmf-AqFaIebrD_1GEVO7S-2jOYBlozgc",
  authDomain: "phones-list-4.firebaseapp.com",
  projectId: "phones-list-4",
  storageBucket: "phones-list-4.appspot.com",
  messagingSenderId: "1011214059771",
  appId: "1:1011214059771:web:a2b03f158961743e2e085e"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase

export const db = firebase.firestore()