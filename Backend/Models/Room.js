// const mongoose = require('mongoose');

// const RoomSchema = new mongoose.Schema({
//     roomId: { type: String, required: true, unique: true }, // Unique Room Identifier
//     roomType: { 
//         type: String, 
//         enum: ['Single', 'Double', 'Suite', 'Deluxe'], 
//         required: true 
//     },
//     pricePerNight: { type: Number, required: true }, // Changed to Number for calculations
//     availabilityStatus: { 
//         type: String, 
//         enum: ['Available', 'Booked', 'Under Maintenance', 'Cleaning'], 
//         required: true 
//     },
//     assignedGuestId: { type: String, default: null }, // Nullable, only required if booked
//     housekeepingStatus: { 
//         type: String, 
//         enum: ['Cleaned', 'Pending'], 
//         default: 'Cleaned' 
//     },
//     image: { type: String, required: true }, // ✅ Added image field (Required when adding)
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Room', RoomSchema);
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    roomType: { type: String, enum: ['Single', 'Double', 'Suite', 'Deluxe'], required: true },
    pricePerNight: { type: Number, required: true },
    availabilityStatus: { type: String, enum: ['Available', 'Booked', 'Under Maintenance', 'Cleaning'], required: true },
    assignedGuestId: { type: String, default: null },
    housekeepingStatus: { type: String, enum: ['Cleaned', 'Pending'], default: 'Cleaned' },
    assignedHousekeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'Housekeeper', default: null },
    taskStatus: { type: String, enum: ['Assigned', 'In Progress', 'Completed'], default: 'Assigned' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', RoomSchema);
