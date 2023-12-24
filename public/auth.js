// auth.js

// Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, provider } from "./firebase_config.js";
// import { initializeAuthStateListener } from './StateChanged.js';
import { getDoc, collection, updateDoc, doc ,onSnapshot,query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";


document.addEventListener("DOMContentLoaded", function () {
    const signInB = document.getElementById("signInB");

    const userSignIn = async () => {
        // Sign in with Google
        signInWithPopup(auth, provider)
        .then((result) => {
            // Successful authentication, store user data in session
            const user = result.user;
            
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                
                // Add other relevant user data
            };
            // Initialize the authentication state listener
            // initializeAuthStateListener(user.email);
            sessionStorage.setItem('userData', JSON.stringify(userData));
            // console.log(user);
            // Redirect to user page
             checkUserRole(userData.uid);
            
        })
        .catch((error) => {
            console.error(error.message);
        });
    }

    if (signInB) {
        signInB.addEventListener('click', userSignIn);
    }
});

async function checkUserRole(uid) {
  // Assume you have a Firestore database with a 'users' collection
  const userDocRef = doc(database, 'Role', uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    const userRole = userData.role;

    if (userRole === 'admin') {
      // Redirect to admin view
      window.location.href = 'admin_page.html';
    } else {
      // Redirect to user view
      window.location.href = 'user_page.html';
    }
  }
  else{
    window.location.href = 'user_page.html';
  }
}




