import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import {app,database} from "./firebase_config.js";
import {collection , addDoc,getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

export const collectionRef=collection(database,'users');
const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
const currentDate = new Date();
const options = { weekday: 'short' ,month: 'short', day: '2-digit', year: 'numeric' };
let formattedDate = currentDate.toLocaleDateString('en-US', options);
formattedDate = formattedDate.replace(/,/g, '');


export const getlocation=async()=>{
    return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
    
            // Display information to the user
            resolve(location);
          },
          (error) => {
            console.error('Error getting location:', error);
            // If there's an error, still display the user information without location
            reject(null);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        // If geolocation is not supported, still display the user information without location
        reject(null);

    }
});
}



export const handleInput = async () => {
    console.log('handleInput function called');
    try {
        const currentLocation = await getlocation();
        addDoc(collectionRef, {
            email: userData.email,
            name: userData.displayName,
            date:formattedDate,
            status:true,
            log_in: currentDate,
            log_out:null,
            location: currentLocation || null,
            log_out_location:null,
            no_of_students:null
        }).then(() => {
            
            alert('Attendence Updated');
            window.location.href = './index.html';
        }).catch((err) => {
            console.error('Error adding data:', err);
            alert('Failed to add data. Check the console for details.');
        });
    } catch (error) {
        console.error('Error getting location:', error);
        alert('Failed to get location. Check the console for details.');
    }
}







  