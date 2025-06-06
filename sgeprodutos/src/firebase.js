// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo7fGkjRpCAvV0llJ5SPToxzOcUrdcsSo",
  authDomain: "sgeprodutos-924c3.firebaseapp.com",
  projectId: "sgeprodutos-924c3",
  storageBucket: "sgeprodutos-924c3.firebasestorage.app",
  messagingSenderId: "418041479882",
  appId: "1:418041479882:web:2260275ce835d06b13aa33"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
