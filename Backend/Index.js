require('./db'); // Just importing this will connect to MongoDB
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 2000;

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/User', require('./Route/User'));
app.use('/api/Room', require('./Route/Room'));

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
