import {doc,updateDoc,collection }  from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
const collectionP=collection(database,'Profile');
 export async function newupt(kalikakendra,quantity,cluster,profileId,tid){
    await updateDoc(doc(collectionP, profileId), {
        kalikakendra: kalikakendra.value,
        cluster: cluster.value,
        No_of_Students: quantity.value,
        Teacher_id:tid.value
    });
    
    alert('Data Updated');
}
