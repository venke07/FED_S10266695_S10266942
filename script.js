document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '0b6d0d2d853929ef7f1f59c878eac87cad663';
  const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/account';

  // Handle signup form submission
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert('Signup successful!');
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  });

  // Handle login form submission
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-apikey': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      const user = data.find(user => user.username === username && user.password === password);
      if (user) {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid username or password.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  });
});

