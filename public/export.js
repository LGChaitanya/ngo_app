// // Assuming you have already initialized Firebase and have a reference to Firestore
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// import { app, database } from "./firebase_config.js";
// import { exportToExcel } from "./admin.js"; // Import the exportToExcel function

// // Assuming you have a button with id "exportToExcelButton" and a modal with id "exportModal"
// const exportButton = document.getElementById('exportToExcelButton');
// const exportModalButton = document.getElementById('exportModalButton');

// exportButton.addEventListener('click', function () {
//     $('#exportModal').modal('show');
// });

// exportModalButton.addEventListener('click', async function () {
//     try {
//         // Retrieve values from the modal inputs
//         const email = document.getElementById('emailInput').value;
//         const fromDate = document.getElementById('fromDateInputModal').value;
//         const toDate = document.getElementById('toDateInputModal').value;

//         // Construct a Firestore query based on the entered values
//         let baseQuery = collection(database, 'users');
//         let firestoreQuery = query(baseQuery);

//         if (email) {
//             firestoreQuery = query(firestoreQuery, where('emailField', '==', email));
//         }

//         if (fromDate) {
//             firestoreQuery = query(firestoreQuery, where('dateField', '>=', fromDate));
//         }

//         if (toDate) {
//             firestoreQuery = query(firestoreQuery, where('dateField', '<=', toDate));
//         }

//         if (email && fromDate && toDate) {
//             firestoreQuery = query(firestoreQuery,where('emailField', '==', email)
//                          ,where('dateField', '>=', fromDate)
//                          ,where('dateField', '<=', toDate));
//         }
//         // Execute the query
//         const querySnapshot = await getDocs(firestoreQuery);

//         // Extract data from the query snapshot
//         const data = [];
//         querySnapshot.forEach(doc => {
//             data.push(doc.data());
//         });

//         // Specify a filename for the exported Excel sheet
//         const fileName = 'exported_data.xlsx';

//         // Call the export function
//         exportToExcel(data, fileName);

//         // Close the modal after exporting
//         $('#exportModal').modal('hide');
//     } catch (error) {
//         console.error('Error exporting data to Excel:', error);
//     }
// });
