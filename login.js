document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '6788f0bf7cf4e11f6418ad94';
  const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/account';

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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const user = data.find(user => user.username === username && user.password === password);
      if (user) {
        alert('Login successful!');
        window.location.href = 'index.html';
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
