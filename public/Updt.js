import { getDocs, collection, updateDoc, doc ,onSnapshot,query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
import { getlocation } from "./log_att.js";
import { getUserActivityByEmail } from "./dview.js";


const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
const logoutTime = new Date().toLocaleTimeString();
const location= await getlocation();
export async function onViewButtonClick() {
  try {
    const userQuery = query(collection(database, 'users'), where('email', '==', userData.email),orderBy('log_in','desc'),limit(1));
           
    const userActivity = await getUserActivityByEmail(userQuery,userData.email);
    const record=userActivity[0];
    console.log(userActivity);
    if (userActivity.length > 0) {
      // Display the user activity or perform any action with it
      const check=record.id;
      const docToUpdate = doc(database, 'users', check);
      await updateDoc(docToUpdate,  { log_out: logoutTime,	log_out_location:location,status:false,no_of_students: attendanceInput });
      alert('Updated');
    }
    else {
      console.log('No matching records found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const attendanceInput = document.getElementById('no_of_students').value;