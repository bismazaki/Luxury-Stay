// const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");

// const UserSchema = new mongoose.Schema({
//     userId: { type: String, required: true, unique: true }, // Unique Identifier
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true },
//     role: { 
//         type: String, 
//         enum: ['Admin', 'Staff', 'Guest'], 
//     },
//     password: { type: String, required: true }, // Will be hashed before saving
//     address: { type: String, required: function() { return this.role === 'Guest'; } }, // Only for Guests
//     preferences: { type: String, required: function() { return this.role === 'Guest'; } }, // Only for Guests
//     accountStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, 
//     createdAt: { type: Date, default: Date.now }
// });

// // 🔹 Mongoose pre-save hook to hash password before saving
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified("password")) return next(); // If password is not modified, skip hashing

//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Unique Identifier
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Staff', 'Guest'], 
        required: true
    },
    password: { type: String, required: true }, // Will be hashed before saving
    address: { type: String, required: function() { return this.role === 'Guest'; } }, // Only for Guests
    preferences: { type: String, required: function() { return this.role === 'Guest'; } }, // Only for Guests
    accountStatus: { 
        type: String, 
        enum: ['Active', 'Inactive'], 
        default: function() { return this.role === 'Staff' ? 'Inactive' : 'Active'; } // Staff are inactive by default
    },
    createdAt: { type: Date, default: Date.now }
});

// 🔹 Mongoose pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next(); // If password is not modified, skip hashing

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);

