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
      const userQuery = query(collection(database, 'users'),where('email', '==', searchemail.value), orderBy('log_in','desc'));
      const userActivity = await getUserActivityByEmail(userQuery);
      if (userActivity.length > 0) {
        // Display the user activity or perform any action with it
        console.log(userActivity);
        displayUserActivity(userActivity, userTableContainer);
      } else {
        alert('No matching records found.');
      }
    } catch (error) {
      alert('Error fetching data:', error);
    }
  }


  async function viewdate() {
    try {
        const userEmail = searchemail.value;
        const fromDate = document.getElementById("fromDateInput").value;
        console.log(userEmail);
        let fromDate1=new Date(fromDate);
        console.log(fromDate1);
        if (!userEmail || !fromDate) {
            alert('Please enter email and select a "from" date for searching.');
            return;
        }

        // Convert the selected date string into a JavaScript Date object
        
        
          const userQuery = query(
            collection(database, 'users'),
            where('email', '==', userEmail),
            where('log_in', '>', fromDate1),
            orderBy('log_in', 'desc')
          );

        const userActivity = await getUserActivityByEmail(userQuery);
        
        displayUserActivity(userActivity, userTableContainer);
    } catch (error) {
        alert('Error fetching data:', error);
    }
}

function parseDate(dateString) {
  const parts = dateString.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

  const searchemail = document.getElementById("searchInput");

  const searchdate = document.getElementById("fromDateInput");
  const out = document.getElementById("search1");

const out1 = document.getElementById("search");
out1.addEventListener('click', viewdate);
out.addEventListener('click', vieww);

const userTableContainer = document.getElementById('userTableContainer');