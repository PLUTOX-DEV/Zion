// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf3i813eYRwixsWziRyDXCvNXX_Qcx4x8",
  authDomain: "zion-id.firebaseapp.com",
  projectId: "zion-id",
  storageBucket: "zion-id.appspot.com",
  messagingSenderId: "110200958143",
  appId: "1:110200958143:web:90af4acbc18add9cabaa0a",
  measurementId: "G-ZWPQLHFJGD",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
