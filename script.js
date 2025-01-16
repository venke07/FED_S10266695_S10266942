// Select the promo banner
const promoBanner = document.querySelector('.promo-banner');

// Image URL to show on hover
const hoverImageUrl = "images/running-shoes.png"; // Replace with your image URL
const defaultBackgroundColor = '#ddd';

// Add hover event to display the image
promoBanner.addEventListener('mouseover', () => {
    promoBanner.style.backgroundImage = `url(${hoverImageUrl})`;
    promoBanner.style.backgroundSize = '1200px 800px'; 
    promoBanner.style.backgroundPosition = 'center';
    promoBanner.style.backgroundRepeat = 'no-repeat'; 
});

promoBanner.addEventListener('mouseout', () => {
  promoBanner.style.backgroundImage = '';
  promoBanner.style.backgroundColor = defaultBackgroundColor;
});

// RestDB.io API key and URL
const apiKey = '6788f0bf7cf4e11f6418ad94';
const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/users';

// Handle signup form submission
document.querySelector('.signup-section form').addEventListener('submit', function(event) {
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
  .then(response => response.json())
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
