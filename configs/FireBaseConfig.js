// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_7te1d6QcIdQQcnjpOCmVfn-55fmoG6s",
  authDomain: "fir-app-2f0da.firebaseapp.com",
  projectId: "fir-app-2f0da",
  storageBucket: "fir-app-2f0da.appspot.com",
  messagingSenderId: "297766252082",
  appId: "1:297766252082:web:0040f9d7878b6ad049962b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);