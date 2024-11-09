const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const app = express();

const SECRET_KEY = "your_secret_key"; // replace with a strong secret key

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Mock user for demonstration
const user = {
    id: 1,
    username: "testuser",
    password: "testpassword"
};

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        // Generate JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected route
app.get('/profile', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        res.json({ message: 'Welcome to your profile', userId: decoded.userId });
    });
});


app.listen(5000, () => console.log('Server running on port 5000'));
