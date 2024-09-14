// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBU9TbAgfaONyFFSpTlbF3pECGSXJ-eUnk",
  authDomain: "inventory-management-bcdbc.firebaseapp.com",
  projectId: "inventory-management-bcdbc",
  storageBucket: "inventory-management-bcdbc.appspot.com",
  messagingSenderId: "354955254994",
  appId: "1:354955254994:web:2896829594b1b6bdab210b",
  measurementId: "G-K1D670RDFC",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//Sign-up
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

signup_btn?.addEventListener("click", createUserAccount);

//Sign-in
const signin_email = document.getElementById("signin_email");
const signin_password = document.getElementById("signin_password");
const signin_btn = document.getElementById("signin_btn");
signin_btn?.addEventListener("click", signIn);

//Sign-out
const logout_btn = document.querySelector(".logout_btn");
logout_btn?.addEventListener("click", logOut);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in");
    const uid = user.uid;
  } else {
    console.log("user is not logged in");
  }
});

function createUserAccount() {
  createUserWithEmailAndPassword(
    auth,
    signup_email.value,
    signup_password.value
  )
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "login.html"
      console.log("User=>", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
}

function signIn() {
  signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user");
      window.location = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function logOut(){
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location = "login.html";
      }).catch((error) => {
        // An error happened.
      });
}
