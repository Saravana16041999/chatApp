import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDezQlCw0WsC4A16rY22_Ol2LmGlTopEWI",
  authDomain: "chatapp-a309f.firebaseapp.com",
  projectId: "chatapp-a309f",
  storageBucket: "chatapp-a309f.appspot.com",
  messagingSenderId: "40718054408",
  appId: "1:40718054408:web:0f4084915a4af8578e0dbd"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);