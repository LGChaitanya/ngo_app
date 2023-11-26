import { collection, getDocs, query, where,orderBy ,limit} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";


const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);

export const getUserActivityByEmail = async (email,n=Infinity) => {
  const userQuery = query(collection(database, 'users'), where('email', '==', email),orderBy('log_in','desc'),limit(n));
  const querySnapshot = await getDocs(userQuery);

  const userActivity = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    userActivity.push({
      id:doc.id,
      date:userData.date,
      status:userData.status,
      email:userData.email,
      logIn: userData.log_in,
      logOut: userData.log_out,
      logInLocation: userData.location,
      logOutLocation: userData.log_out_location
    });
  });
  return userActivity;
};