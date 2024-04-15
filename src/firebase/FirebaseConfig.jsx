// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxmHpa2yyiV5Cnd1GaRoSQ0d1laCVmamY",

  authDomain: "yj---fashion.firebaseapp.com",

  projectId: "yj---fashion",

  storageBucket: "yj---fashion.appspot.com",

  messagingSenderId: "311070201990",

  appId: "1:311070201990:web:f0b51cfa9705ede178d907",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
