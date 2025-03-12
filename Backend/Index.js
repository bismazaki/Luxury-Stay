// require('./db'); // Just importing this will connect to MongoDB
// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');

// const app = express();
// const port = 2000;

// app.use(cors());

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/User', require('./Route/User'));
// app.use('/api/Room', require('./Route/Room'));
// app.use('/api/feedback', require('./Route/Feedback'));
// app.use('/api/housekeeping', require('./Route/Housekeeping'));
// app.use('/api/payment', require('./Route/Payment'));
// app.use('/api/report', require('./Route/Report'));
// app.use('/api/booking', require('./Route/Booking'));
// app.use('/api/billing', require('./Route/Billing'));

// // Start Server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

require('./db'); // Just importing this will connect to MongoDB
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); // Add path module

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json()); // Middleware for JSON parsing

// ✅ Static folder for invoices
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

// Routes
app.use('/api/User', require('./Route/User'));
app.use('/api/Room', require('./Route/Room'));
app.use('/api/feedback', require('./Route/Feedback'));
app.use('/api/housekeeping', require('./Route/Housekeeping'));
app.use('/api/payment', require('./Route/Payment'));
app.use('/api/report', require('./Route/Report'));
app.use('/api/booking', require('./Route/Booking'));
app.use('/api/billing', require('./Route/Billing'));

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
