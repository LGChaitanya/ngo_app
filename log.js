
import { getDocs, collection, updateDoc, doc ,onSnapshot,query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
import {handleInput} from "./log_att.js";
import { getUserActivityByEmail } from "./dview.js";
import { onViewButtonClick } from "./Updt.js";
import { status,date } from "./StateChanged.js";

const currentDate = new Date().toDateString();
const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);

async function handleLogin() {
    try {
        // status=true;
        if(date==currentDate){
            alert('can log in once in a day');
            document.getElementById("Loginbtn").disabled = true;
            document.getElementById("Logoutbtn").disabled = true;
        }else{
        loginBtn.disabled = true;
        out.disabled = false;
        handleInput();
        document.getElementById("Loginbtn").disabled = true;
        document.getElementById("Logoutbtn").disabled = false;
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}
const out = document.getElementById("Logoutbtn");
const loginBtn = document.getElementById("Loginbtn");
loginBtn.addEventListener('click', handleLogin);


// import {handleInput,collectionRef} from "./log-att.js";


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
function check(){
    console.log(81);
if(status){
    console.log(8955);
    console.log('11',status);
    document.getElementById("Loginbtn").disabled = true;
    document.getElementById("Logoutbtn").disabled = false;
}else{
    console.log('00',status);
    console.log(890);
    document.getElementById("Loginbtn").disabled = false;
    document.getElementById("Logoutbtn").disabled =true ;
}
}
// check();