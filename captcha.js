// Require necessary packages - make sure to install these with npm
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve your static files from 'public' directory

// Generate math CAPTCHA
app.get('/generate-captcha', (req, res) => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const captchaText = `${num1} + ${num2}`;
    const captchaAnswer = num1 + num2;

    console.log('Generated CAPTCHA:', captchaText);
    res.json({ captchaText, captchaAnswer });
});

// Simple CAPTCHA verification endpoint
app.post('/verify-captcha', (req, res) => {
    const userCaptcha = parseInt(req.body.captcha, 10);
    const serverCaptcha = parseInt(req.body.serverCaptcha, 10);

    console.log('Received CAPTCHA:', userCaptcha);
    console.log('Expected CAPTCHA:', serverCaptcha);

    if (userCaptcha === serverCaptcha) {
        console.log('CAPTCHA verification successful');
        res.json({
            success: true,
            message: 'CAPTCHA verification successful!'
        });
    } else {
        console.log('CAPTCHA verification failed');
        res.json({
            success: false,
            message: 'CAPTCHA verification failed. Please try again.'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error. Please try again later.'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});