import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqp3E9npZG9VmUc0VDHWcMwsy8-92x3oA",
  authDomain: "discord-clone-cae29.firebaseapp.com",
  projectId: "discord-clone-cae29",
  storageBucket: "discord-clone-cae29.appspot.com",
  messagingSenderId: "578555013655",
  appId: "1:578555013655:web:9266aeb984d58b2a650a52",
  databaseURL: "https://discord-clone-cae29-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
