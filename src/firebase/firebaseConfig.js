// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAtrt3FPMq8SSGF6omX-X_Q59eXYrI5E4",
  authDomain: "taskcanvas-official.firebaseapp.com",
  databaseURL: "https://taskcanvas-official-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "taskcanvas-official",
  storageBucket: "taskcanvas-official.appspot.com",
  messagingSenderId: "712976731202",
  appId: "1:712976731202:web:c57b595e5bbd139fec31db",
  measurementId: "G-Q0HX8L55QG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth object
const db = getFirestore(app); // Initialize Firestore

const analytics = getAnalytics(app);

export { app, auth, db, analytics };
