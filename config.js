// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvXjGrNsEvvdrs8vFpXMKy771fB4O392Q",
  authDomain: "timr-reactnative.firebaseapp.com",
  projectId: "timr-reactnative",
  storageBucket: "timr-reactnative.appspot.com",
  messagingSenderId: "802073452994",
  appId: "1:802073452994:web:755700d6a6f9ae8f10f65b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
