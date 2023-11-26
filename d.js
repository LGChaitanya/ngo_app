import { getDocs, collection, updateDoc, doc ,onSnapshot,query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
import { getUserActivityByEmail } from './dview.js';
import { displayUserActivity } from './table.js';

const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
// Check if user data exists
// if (userDataString) {
   
//     const uname = document.getElementById('userName');

//         if (userName) {
//             uname.textContent = 'Welcome, ' + userData.displayName ;
//         }
//     // Now you can use userData.displayName, userData.email, etc. in this file
// } else {
//     // User data doesn't exist, handle accordingly
//     console.log('User data not found. Redirecting to login page...');
//         window.location.href = '404.html';
// }



async function Last() {
    try {
      const userActivity = await getUserActivityByEmail(userData.email,1);
     
      if (userActivity.length > 0) {
        // Display the user activity or perform any action with it
        console.log(userActivity);
        
        displayUserActivity(userActivity, userTableContainer);
      } else {
        console.log('No matching records found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  

  const last30DaysButton = document.getElementById('demo');
  last30DaysButton.addEventListener('click',Last);
  const closeTableButton = document.getElementById('close');
  const userTableContainer = document.getElementById('userTableContainer');

  closeTableButton.addEventListener('click', () => {
    // Clear the table container when the "Close Table" button is clicked
    userTableContainer.innerHTML = '';
  });

