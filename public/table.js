// display.js

export function displayUserActivity(userActivity, container) {
  // Remove any existing tables before creating a new one
  container.innerHTML = '';

  // Create a table element
  const table = document.createElement('table');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['Email', 'Log In', 'Log Out', 'Log In Location','Log out Location'];
  
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');

  userActivity.forEach(user => {
    const row = document.createElement('tr');

    // Assuming keys in the user object match the headers
    headers.forEach(header => {
      const cell = document.createElement('td');

      // Check if the user object has the specified key
      if (header.toLowerCase() === 'log in') {
        const timestamp = user['logIn'];
      const formattedDate = formatFirestoreTimestamp(timestamp);
      cell.appendChild(document.createTextNode(formattedDate || ''));
      }
       else if (header.toLowerCase() === 'log out') {
        const logOutValue = user['logOut'];
        cell.appendChild(document.createTextNode(logOutValue !== null ? logOutValue : 'Log Out is null or undefined'));
      }
       else if (header.toLowerCase() === 'log in location') {
        const logInLocation = user['logInLocation'];
        const latitude = logInLocation ? logInLocation.latitude : '';
        const longitude = logInLocation ? logInLocation.longitude : '';
        cell.appendChild(document.createTextNode(`Latitude: ${latitude}, Longitude: ${longitude}`));
      } else if (header.toLowerCase() === 'log out location') {
        const logOutLocation = user['logOutLocation'];
        const latitude = logOutLocation ? logOutLocation.latitude : '';
        const longitude = logOutLocation ? logOutLocation.longitude : '';
        cell.appendChild(document.createTextNode(`Latitude: ${latitude}, Longitude: ${longitude}`));
      } else {
        cell.appendChild(document.createTextNode(user[header.toLowerCase()] || ''));
      }

      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Append the table to the container in your HTML
  container.appendChild(table);
}


function formatFirestoreTimestamp(timestamp) {
  if (!timestamp || !timestamp.seconds) {
    return '';
  }

  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

  // Set the timezone manually to IST
  const options = { timeZone: 'Asia/Kolkata', timeZoneName: 'short' };
  
  // Use toLocaleString with options to format the date as "Sun Jan 07 2024 16:46:43 IST"
  return date.toLocaleString('en-IN', options);
}