// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2nu_WI5MMpl66c4FzKG47Q6rCY8vtMGg",
  authDomain: "products-coodesh-e062a.firebaseapp.com",
  databaseURL: "https://products-coodesh-e062a-default-rtdb.firebaseio.com",
  projectId: "products-coodesh-e062a",
  storageBucket: "products-coodesh-e062a.appspot.com",
  messagingSenderId: "709430790426",
  appId: "1:709430790426:web:4020d1e12a98d99f2a84a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

export const dataBase = getFirestore(app);
export const firebaseStorage = getStorage(app, "gs://products-coodesh-e062a.appspot.com");