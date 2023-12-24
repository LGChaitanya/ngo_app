const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);

import { getDocs, collection, updateDoc,onSnapshot,query,where,orderBy,limit ,addDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import{ doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";

import { newupt } from "./updatedoc.js";

const collectionP=collection(database,'Profile');
if (userDataString) {
    const userData = JSON.parse(userDataString);
    const uname = document.getElementById('user');
    // const udname = document.getElementById('userd');
        if (userData) {
            uname.textContent = userData.displayName  ;
        }
       
        
    // Now you can use userData.displayName, userData.email, etc. in this file
} else {
    // User data doesn't exist, handle accordingly
    console.log('User data not found. Redirecting to login page...');
        window.location.href = '404.html';
}




      const name = document.getElementById('name');
      const kalikakendra = document.getElementById('kalikakendra');
      const cluster = document.getElementById('cluster');
      const quantity= document.getElementById('quantity');
     

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
  
 profileForm.addEventListener('submit', async(event) => {
      event.preventDefault();
        console.log('1');
       try {
        console.log('2');
        const userQuery = query(collection(database, 'Profile'), where('email', '==', userData.email),limit(1));
        const querySnapshot = await getDocs(userQuery);
        console.log(querySnapshot);
        console.log('3');
        querySnapshot.forEach(async (doc) => {
            const profileId = doc.id;
            console.log(profileId);
            // Update the existing profile with new data
            newupt(name,kalikakendra,quantity,cluster,profileId);
        
            // After updating, re-fetch the data and display it in the form
            // const updatedQuerySnapshot = await getDocs(userQuery);
            // updatedQuerySnapshot.forEach((updatedDoc) => {
            //     const updatedUserData = updatedDoc.data();
            //     // Fill the form with the updated data
            //     name.value = updatedUserData.name;
            //     kalikakendra.value = updatedUserData.kalikakendra;
            //     cluster.value = updatedUserData.cluster;
            //     quantity.value = updatedUserData.No_of_Students;
            // });
        });
        // If the user does not have a profile, add a new profile
        if (querySnapshot.empty) {
             addDoc(collectionP, {
                email: userData.email,
                name: name.value,
                kalikakendra: kalikakendra.value,
                cluster: cluster.value,
                No_of_Students: quantity.value
            });

            alert('Data Added');
        }
    } 
    catch (error) {
        console.error('Error getting location:', error);
        alert('Failed to get location. Check the console for details.');
    }
  
      // Save the profile data to local storage (simulate server-side storage)
      console.log('4');   
    });
  });
  

  
//   const userActivity = [];
//   const fetch= async (email) => {
//     const userQuery = query(collection(database, 'Profile'), where('email', '==', email));
//     const querySnapshot = await getDocs(userQuery);
  
//   if(userActivity.email)
//     querySnapshot.forEach((doc) => {
//       const userData = doc.data();
//       userActivity.push({
//         email:userData.email,
//         name:name,
//         kalikakendra:kalikakendra,
//         cluster:cluster,
//         No_of_Students:quantity
//       });
//     });
    
//     console.log(userActivity);


//   };
//   fetch();


//   async function fetchAndFillForm() {
    
//     const userQuery = query(collection(database, 'Profile'), where('email', '==', user.email));
//     const querySnapshot = await getDocs(userQuery);
//     if(userActivity.email)
//     querySnapshot.forEach((doc) => {
//       const userData = doc.data();
//       userActivity.push({
//         email:userData.email,
//         name:name,
//         kalikakendra:kalikakendra,
//         cluster:cluster,
//         No_of_Students:quantity
//       });
//     });
//     const profileData = userActivity;
  
//     console.log(userActivity);

//     document.getElementById('name').value=profileData.name;
//     document.getElementById('kalikakendra').value=profileData.kalikakendra;
//     document.getElementById('cluster').value=profileData.cluster;
//     document.getElementById('quantity').value=profileData.quantity;
//   }
//   fetchAndFillForm();

// Assuming that 'userData' contains the user's information, including the email

// Import necessary Firestore functions

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch user's profile data from Firestore based on their email
    const userQuery = query(collection(database, 'Profile'), where('email', '==', userData.email));
    const querySnapshot = await getDocs(userQuery);

    querySnapshot.forEach((doc) => {
        const userDataq = doc.data();
        // Fill the form with the fetched data
        name.value = userDataq.name;
        kalikakendra.value = userDataq.kalikakendra;
        cluster.value = userDataq.cluster;
        quantity.value = userDataq.No_of_Students;
    });
});

