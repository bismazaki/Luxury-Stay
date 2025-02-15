const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Unique Identifier
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Manager', 'Receptionist', 'Housekeeping', 'Guest'], 
        required: true 
    },
    password: { type: String, required: true }, // Encrypted in the backend
    address: { type: String, required: function() { return this.role === 'Guest'; } }, // Only for Guests
    preferences: { type: String, required: function() { return this.role === 'Guest'; } }, // Only for Guests
    accountStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
