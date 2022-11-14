import { refs } from "./refs.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, EmailAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// Import for firebase UI
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmX7oSKJUY7RkPgJC9tyRP6scbuCaDTDk",
  authDomain: "test-76bac.firebaseapp.com",
  databaseURL: "https://test-76bac-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-76bac",
  storageBucket: "test-76bac.appspot.com",
  messagingSenderId: "381095224947",
  appId: "1:381095224947:web:03dd86359f3f04eec6ec06",
};
const uiConfig = {
  signInOptions: [EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => {},
  },
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

// Variables
let currentUser;

// Write to Firebase
refs.writeBtn.addEventListener("click", () => {
  const path = `${currentUser.uid}/${refs.writePath.value}`;
  console.log("Write path:", path);

  const value = refs.writeValue.value;
  set(ref(db, path), value);
});

// Read from Firebase
refs.readBtn.addEventListener("click", async () => {
  const path = `${currentUser.uid}/${refs.readPath.value}`;
  console.log("Read path:", path);

  const value = await get(ref(db, path));
  refs.readValue.value = "";
  refs.readValue.value = JSON.stringify(value);
});

// Log in
refs.signBtn.addEventListener("click", () => {
  if (currentUser) {
    signOut(auth);
  } else {
    ui.start(".js-sign-modal", uiConfig);
  }
});

// Update User
onAuthStateChanged(auth, (user) => {
  if (user) {
    refs.user.textContent = user.email;
    refs.signBtn.textContent = "Log out";
  } else {
    refs.user.textContent = "";
    refs.signBtn.textContent = "Log in";
  }
  currentUser = user;
});
