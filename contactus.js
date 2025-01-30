document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const characterCount = document.querySelector('.character-count');
    const maxLength = 300;

    // Update character count
    messageTextarea.addEventListener('input', () => {
        const remaining = maxLength - messageTextarea.value.length;
        characterCount.textContent = `${remaining}/${maxLength}`;

        if (remaining < 0) {
            messageTextarea.value = messageTextarea.value.slice(0, maxLength);
            characterCount.textContent = `0/${maxLength}`;
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: `${document.getElementById('countryCode').value} ${document.getElementById('phone').value.trim()}`,
            message: document.getElementById('message').value.trim()
        };

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission (Here you would typically send data to your server)
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        form.reset();

        // Redirect to index.html after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Format phone number as user types
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        // Remove all non-digits
        let value = e.target.value.replace(/\D/g, '');

        // Format as (XXX) XXX-XXXX
        if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        if (value.length >= 9) {
            value = value.slice(0, 9) + '-' + value.slice(9);
        }

        e.target.value = value.slice(0, 14);
    });
});
