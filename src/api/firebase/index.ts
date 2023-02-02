// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  APIKEY,
  APPID,
  AUTHDOMAIN,
  DATABASEURL,
  MESSAGINGSENDERID,
  PROJECTID,
  STORAGEBUCKET
} from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
export const firebaseStorage = getStorage(app, "gs://products-coodesh-e062a.appspot.com");