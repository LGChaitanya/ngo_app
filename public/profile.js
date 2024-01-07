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
      const Tid= document.getElementById('tid');
      
     

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
            newupt(name,kalikakendra,quantity,cluster,profileId,Tid);
        
            
        });
        // If the user does not have a profile, add a new profile
        if (querySnapshot.empty) {
             addDoc(collectionP, {
                email: userData.email,
                name: name.value,
                kalikakendra: kalikakendra.value,
                cluster: cluster.value,
                No_of_Students: quantity.value,
                Teacher_id:Tid.value
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
        Tid.value=userDataq. Teacher_id;
    });
});

