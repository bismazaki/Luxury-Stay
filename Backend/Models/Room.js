const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true }, // Unique Room Identifier
    roomType: { 
        type: String, 
        enum: ['Single', 'Double', 'Suite', 'Deluxe'], 
        required: true 
    },
    pricePerNight: { type: Number, required: true }, // Changed to Number for calculations
    availabilityStatus: { 
        type: String, 
        enum: ['Available', 'Booked', 'Under Maintenance', 'Cleaning'], 
        required: true 
    },
    assignedGuestId: { type: String, default: null }, // Nullable, only required if booked
    housekeepingStatus: { 
        type: String, 
        enum: ['Cleaned', 'Pending'], 
        default: 'Cleaned' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);
