import {doc,updateDoc,collection }  from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { database } from "./firebase_config.js";
const collectionP=collection(database,'Profile');
 export async function newupt(name,kalikakendra,quantity,cluster,profileId){
    await updateDoc(doc(collectionP, profileId), {
        name: name.value,
        kalikakendra: kalikakendra.value,
        cluster: cluster.value,
        No_of_Students: quantity.value
    });
    
    alert('Data Updated');
}

