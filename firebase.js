import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf2Sqwz5IJtZ3AJsgH5ES8MklHVb6uH4o",
    authDomain: "quiz-app-e69ec.firebaseapp.com",
    projectId: "quiz-app-e69ec",
    storageBucket: "quiz-app-e69ec.firebasestorage.app",
    messagingSenderId: "971988618365",
    appId: "1:971988618365:web:aae83bd2b889522e6ff514"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    app,
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc, setDoc,
    getDoc,
    collection, addDoc
}