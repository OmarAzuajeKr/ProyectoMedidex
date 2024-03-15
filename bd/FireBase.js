// Import the functions you need from the SDKs you need
import firebase from 'firebase'
import 'firebase/firestore'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgB8daMu2dIGNaaDI_5PWDhbPLRRBoEVY",
  authDomain: "medidexfirebase.firebaseapp.com",
  projectId: "medidexfirebase",
  storageBucket: "medidexfirebase.appspot.com",
  messagingSenderId: "416041019973",
  appId: "1:416041019973:web:7d2c2efc1d8c792ee4d12c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
    firebase,
    db
}