// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // Import the necessary database functions

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "loadcell-farel.firebaseapp.com",
  databaseURL: "https://loadcell-farel-default-rtdb.firebaseio.com",
  projectId: "loadcell-farel",
  storageBucket: "loadcell-farel.appspot.com",
  messagingSenderId: "1008530511203",
  appId: "1:1008530511203:web:7802cf57eee7547db1ef56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); // Use getDatabase to access the Realtime Database
