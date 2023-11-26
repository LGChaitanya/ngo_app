import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth, provider } from "./firebase_config.js";

import {getUserActivityByEmail} from "./dview.js";
// import { elogin,elogout } from "./log_att.js";
var status=false;
var date=null;
var D_id=null;
var record=null;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log('1');
            // Fetch user status and details from the database
            const userActivity = await getUserActivityByEmail(user.email);
            
            if (userActivity.length > 0) {
              console.log(2);
                record=userActivity[0];
                status=record.status;
                date=record.date;
                D_id=record.id;
              // Check if the user is allowed to login based on status and date
              if (status) {
                console.log(3);
                // Check if the stored date is the same as the current date
                const currentDate = new Date().toDateString();
                if (date == currentDate && status) {
                    console.log(9);
                    status=true;
                    console.log('11',status);
                    document.getElementById("Loginbtn").disabled = true;
                    document.getElementById("Logoutbtn").disabled = false;
                    // elogout();
                } else {
                  console.log(4);
                  status=false;
                  document.getElementById("Loginbtn").disabled = false;
                  document.getElementById("Logoutbtn").disabled =true ;
                    // elogin();
                }
              } else {
                console.log(5);
                document.getElementById("Loginbtn").disabled = false;
                document.getElementById("Logoutbtn").disabled =true ;
                // Enable login and disable logout
                status=false;
                    // elogin();
              }
            } else {
              console.log(6);
              // User status document doesn't exist, create it with initial values
              status=false;
              document.getElementById("Loginbtn").disabled = false;
              document.getElementById("Logoutbtn").disabled =true ;
                    // elogin();
            }
          } else {
            console.log(7);
            document.getElementById("Loginbtn").disabled = false;
            document.getElementById("Logoutbtn").disabled =true ;
            // User is signed out
            // Update UI for signed-out state
            
          }
    });
  

  
  export {record,status,date,D_id};