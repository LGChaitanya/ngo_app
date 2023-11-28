import { getDoc, collection, updateDoc, doc, onSnapshot, query, where, orderBy, limit, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
import { displayUserActivity } from './table.js';
import { getUserActivityByEmail } from './dview.js';

const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);

const Make = document.getElementById('makead');
Make.addEventListener('click', openForm);

function openForm() {
  // Display the form when the button is clicked
  document.getElementById('submissionForm').style.display = 'block';
}

const sub = document.getElementById('s');
sub.addEventListener('click', submitData);

function submitData() {
  // Get the data from the input field
  const inputData = document.getElementById('dataInput').value;

  // Validate the input (you can add more robust validation as needed)
  if (inputData.trim() === "") {
    alert("Please enter data before submitting.");
    return;
  }

  // Clear the input field
  document.getElementById('dataInput').value = "";

  // Hide the form after submission
  document.getElementById('submissionForm').style.display = 'none';

  // Optionally, provide feedback to the user (e.g., show a success message)
  console.log("Data submitted successfully!");
  makeadmin(inputData);
}

const makeadmin = (email) => {
  try {
    const data = {
      role: "admin"
      // Add other fields as needed
    };

    setDoc(doc(database, "Role", email), data)
      .then(() => {
        alert("Document successfully added!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}




async function vieww() {
    try {
      const userQuery = query(collection(database, 'users'), orderBy('log_in','desc'));
 
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

  vieww();