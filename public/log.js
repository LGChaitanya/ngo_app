
import { getDocs,getDoc, collection, updateDoc, doc ,onSnapshot,query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
import {handleInput} from "./log_att.js";
import { getUserActivityByEmail } from "./dview.js";
import { onViewButtonClick } from "./Updt.js";
import { userRole,status,date } from "./StateChanged.js";

const currentDate = new Date();
const options = { weekday: 'short' ,month: 'short', day: '2-digit', year: 'numeric' };
let formattedDate = currentDate.toLocaleDateString('en-US', options);
formattedDate = formattedDate.replace(/,/g, '');
const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);


async function handleLogin() {
    try {
        
        console.log(userRole);
        if (userRole === "superUser") {
            console.log(0);
            console.log("Multiple login's");
            loginBtn.disabled = true;
            out.disabled = false;
            handleInput();
            document.getElementById("Loginbtn").disabled = true;
            document.getElementById("Logoutbtn").disabled = false;
        } else if (date === formattedDate) {
            console.log(0);
            alert('can log in once in a day');
            document.getElementById("Loginbtn").disabled = true;
            document.getElementById("Logoutbtn").disabled = true;
        } else {
            loginBtn.disabled = true;
            out.disabled = false;
            handleInput();
            document.getElementById("Loginbtn").disabled = true;
            document.getElementById("Logoutbtn").disabled = false;
            document.getElementById("no_of_students").disabled =false ;
    
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

const out = document.getElementById("Logoutbtn");
const loginBtn = document.getElementById("Loginbtn");
loginBtn.addEventListener('click', handleLogin);


const logoutTime = new Date().toLocaleTimeString();

async function onLogOutButtonClick() {
  try {
    // status=false;
    loginBtn.disabled = false;
    out.disabled = true;
    onViewButtonClick()
    document.getElementById("Loginbtn").disabled = false;
    document.getElementById("Logoutbtn").disabled =true ;
    
    
} catch (error) {
    console.error('Error during login:', error);
}
}


out.addEventListener('click', onLogOutButtonClick);
// function check(){



// document.getElementById("submitAttendance").addEventListener('click', async () => {
//     try {

//         const attendanceInput = document.getElementById('no_of_students').value;
//         if (!attendanceInput) {
//             alert('Please enter the number of students present.');
//             return;
//         }

//         const userQuery = query(collection(database, 'users'), where('email', '==', userData.email), orderBy('log_in', 'desc'), limit(1));
//         const userActivity = await getUserActivityByEmail(userQuery, userData.email);
//         if (userActivity.length > 0) {
//             const record = userActivity[0];
//             const docToUpdate = doc(database, 'users', record.id);
//             await updateDoc(docToUpdate, { no_of_students: attendanceInput });
//             alert('Attendance submitted successfully.');
//         } else {
//             console.log('No matching records found.');
//         }
//     } catch (error) {
//         console.error('Error submitting attendance:', error);
//     }
// });

if (userRole === "superUser") {
    // Hide the <div> for regular superusers
    document.getElementById("stud").style.display = "none";

} 
// else {
//     // Show the <div> for users
//     document.getElementById("stud").style.display = "none";
// }
