import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_AK4JvCODvfHRGRrCO5s5zUjk67r8KVI",
  authDomain: "registrohuellas.firebaseapp.com",
  projectId: "registrohuellas",
  storageBucket: "registrohuellas.appspot.com",
  messagingSenderId: "382709412110",
  appId: "1:382709412110:web:c34989ab23993e5ba6a75f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };