document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            showMessage('Passwords do not match', false);
            return;
        }

        // Simulate account creation
        const user = {
            username: username,
            email: email,
            password: password
        };

        // Save user to localStorage (for demonstration purposes)
        localStorage.setItem('user', JSON.stringify(user));

        // Show success message
        showMessage('Account created successfully!', true);

        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    function showMessage(message, success = true) {
        console.log('Showing message:', message); // Debugging log
        const messageContainer = document.createElement('div');
        messageContainer.className = `message ${success ? 'success' : 'error'}`;
        messageContainer.textContent = message;
        document.body.appendChild(messageContainer);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageContainer.remove();
        }, 3000);
    }
});
