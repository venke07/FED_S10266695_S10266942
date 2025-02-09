// Your RESTDB API endpoint URL and key
const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/account';
const apiKey = '6788f0bf7cf4e11f6418ad94';

// Form submission handler
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get values from the form
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Data to be sent to the RESTDB
  const userData = {
    username: username,
    email: email,
    password: password
  };

  try {
    // Send a POST request to RESTDB
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': apiKey
      },
      body: JSON.stringify(userData) // Convert data to JSON string
    });

    // Check if the request was successful
    if (response.ok) {
      const result = await response.json();
      console.log('Data sent successfully:', result);
      alert('User data submitted successfully!');
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
      window.location.href = 'index.html'; // Redirect to home page
    } else {
      console.error('Error:', response.statusText);
      alert('There was an error submitting the data.');
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Error while sending data to the server.');
  }
});