import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8fm4OmzitjHbXz64k3nYZtdDxGse4KBI",
  authDomain: "all-coins-93916.firebaseapp.com",
  projectId: "all-coins-93916",
  storageBucket: "all-coins-93916.firebasestorage.app",
  messagingSenderId: "1027482439487",
  appId: "1:1027482439487:web:33d28ec082421c77924d8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };