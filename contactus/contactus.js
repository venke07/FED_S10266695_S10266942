document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const characterCount = document.querySelector('.character-count');
    const maxLength = 300;
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('countryCode');

    // Phone format mapping
    const phoneFormats = {
        "+1": "(XXX) XXX-XXXX",   // US
        "+44": "07XXX XXXXXX",    // UK
        "+61": "0XXX XXX XXX",    // AU
        "+91": "XXXXX-XXXXX",     // IN
        "+81": "0X-XXXX-XXXX",    // JP
        "+49": "0XX XXXXXXXX",    // DE
        "+33": "0X XX XX XX XX",  // FR
        "+39": "3XX XXX XXXX",    // IT
        "+34": "6XX XX XX XX",    // ES
        "+55": "XX XXXXX-XXXX",   // BR
        "+7": "8 XXX XXX-XX-XX",  // RU
        "+86": "1XX XXXX XXXX",   // CN
        "+27": "0XX XXX XXXX",    // ZA
        "+971": "0X XXX XXXX",    // AE
        "+62": "08XX-XXXX-XXXX",  // ID
        "+52": "XX XXXX XXXX",    // MX
        "+82": "010-XXXX-XXXX",   // KR
        "+60": "0X-XXX XXXX",     // MY
        "+66": "0X-XXX-XXXX",     // TH
        "+358": "0XX XXX XXXX",   // FI
        "+46": "0XX-XXX XX XX",   // SE
        "+65": "XXXX XXXX",       // SG
    };

    // Update character count
    messageTextarea.addEventListener('input', () => {
        const remaining = maxLength - messageTextarea.value.length;
        characterCount.textContent = `${remaining}/${maxLength}`;

        if (remaining < 0) {
            messageTextarea.value = messageTextarea.value.slice(0, maxLength);
            characterCount.textContent = `0/${maxLength}`;
        }
    });

    // Update phone placeholder based on country
    function updatePlaceholder() {
        const selectedCode = countryCodeSelect.value;
        phoneInput.placeholder = phoneFormats[selectedCode] || "Enter phone number";
    }

    countryCodeSelect.addEventListener("change", updatePlaceholder);

    // Format phone number based on country
    phoneInput.addEventListener("input", (e) => {
        const selectedCode = countryCodeSelect.value;
        let format = phoneFormats[selectedCode] || "XXXXXXXXXX"; // Default format

        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Apply formatting dynamically
        let formattedValue = "";
        let index = 0;

        for (let char of format) {
            if (char === "X") {
                if (index < value.length) {
                    formattedValue += value[index];
                    index++;
                } else {
                    break;
                }
            } else {
                formattedValue += char;
            }
        }

        e.target.value = formattedValue;
    });

    // Initialize phone placeholder
    updatePlaceholder();

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: `${countryCodeSelect.value} ${phoneInput.value.trim()}`,
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

        // Show popup box
        const popupBox = document.getElementById('popupBox');
        popupBox.style.display = 'block';

        // Hide popup box after 3 seconds and redirect to index.html
        setTimeout(() => {
            popupBox.style.display = 'none';
            window.location.href = '../index.html';
        }, 3000);

        // Reset form
        form.reset();
        updatePlaceholder(); // Reset phone placeholder
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
