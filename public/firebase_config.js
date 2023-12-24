import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUZ1mxHBXoFqCYZ-LV9q2cSEBBGGa_Od8",
  authDomain: "demoapp-7d004.firebaseapp.com",
  databaseURL: "https://demoapp-7d004-default-rtdb.firebaseio.com",
  projectId: "demoapp-7d004",
  storageBucket: "demoapp-7d004.appspot.com",
  messagingSenderId: "559486024644",
  appId: "1:559486024644:web:985262b8b7330e7ea38291",
  measurementId: "G-1DST9H93L4"
};

  export const app = initializeApp(firebaseConfig);
  export const auth=getAuth();
  export const provider=new GoogleAuthProvider();
  export const database =getFirestore(app);
