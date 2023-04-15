import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBzxrL_wnjBN0Z_z3QXaOQf77FSZdDbxxU",
  authDomain: "nxt-search.firebaseapp.com",
  databaseURL: "https://nxt-search-default-rtdb.firebaseio.com",
  projectId: "nxt-search",
  storageBucket: "nxt-search.appspot.com",
  messagingSenderId: "941029822273",
  appId: "1:941029822273:web:25b1b1d2b4449be026dbc0",
  measurementId: "G-6ZW0YTM3ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);