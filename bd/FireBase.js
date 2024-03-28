import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
        apiKey: "AIzaSyBgB8daMu2dIGNaaDI_5PWDhbPLRRBoEVY",
        authDomain: "medidexfirebase.firebaseapp.com",
        projectId: "medidexfirebase",
        storageBucket: "medidexfirebase.appspot.com",
        messagingSenderId: "416041019973",
        appId: "1:416041019973:web:7d2c2efc1d8c792ee4d12c"
};

export const FIREBASE_APP =  initializeApp (firebaseConfig);

let auth;
if (!getAuth(FIREBASE_APP)) {
    auth = initializeAuth(FIREBASE_APP, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} else {
    auth = getAuth(FIREBASE_APP);
}

export const FIREBASE_AUTH = auth;
export const FIREBASE_DB =  getFirestore(FIREBASE_APP);