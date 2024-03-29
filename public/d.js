import { getDocs, collection, updateDoc, doc ,onSnapshot,query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
import { getUserActivityByEmail } from './dview.js';
import { displayUserActivity } from './table.js';
import { userRole } from "./StateChanged.js";

const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
async function Last() {
    try {
      var userQuery = query(collection(database, 'users'), where('email', '==', userData.email),orderBy('log_in','desc'),limit(1));
      
      if(userRole === 'superUser'){
        var userQuery = query(collection(database, 'users'), where('email', '==', userData.email),orderBy('log_in','desc'),limit(5));
 
      }
     
      
      const userActivity = await getUserActivityByEmail(userQuery,userData.email);
     
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

