// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Your RESTDB API endpoint URL and key
  const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/account';
  const apiKey = '6788f0bf7cf4e11f6418ad94';

  // Get the form element
  const signupForm = document.getElementById('signup-form');

  if (signupForm) {
      // Form submission handler
      signupForm.addEventListener('submit', async (event) => {
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
                  
                  // Store user data in local storage
                  localStorage.setItem('user', JSON.stringify(userData));
                  
                  // Show success message
                  alert('Signup successful! Redirecting to login page...');
                  
                  // Redirect to login page
                  window.location.href = 'login.html';
              } else {
                  console.error('Error:', response.statusText);
                  alert('There was an error submitting the data. Please try again.');
              }
          } catch (error) {
              console.error('Request failed:', error);
              alert('Error while sending data to the server. Please check your connection and try again.');
          }
      });
  } else {
      console.error('Signup form not found in the document');
  }
});