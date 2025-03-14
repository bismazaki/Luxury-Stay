// // const mongoose = require('mongoose');

// // const BookingSchema = new mongoose.Schema(
// //     {
// //         guestId: {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: "User", // Foreign key reference to User collection
// //             required: true,
// //         },
// //         guestName: {
// //             type: String,
// //             ref: "User", // Foreign key reference to User collection
// //             required: true,
// //         },
// //         roomId: {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: "Room", // Foreign key reference to Room collection
// //             required: true,
// //         },
// //         checkInDate: {
// //             type: Date,
// //             required: true,
// //         },
// //         checkOutDate: {
// //             type: Date,
// //             required: true,
// //         },
// //         totalAmount: {
// //             type: Number,
// //             required: true,
// //         },
// //         paymentStatus: {
// //             type: String,
// //             enum: ["Pending", "Paid", "Refunded"],
// //             default: "Pending",
// //         },
// //     },
// //     { timestamps: true }
// // );

// // module.exports = mongoose.model("Booking", BookingSchema);
// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema(
//     {
//         guestId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User", // Correct reference to User collection
//             required: true,
//         },
//         guestName: {
//                        type: String,
//                        ref: "User", // Foreign key reference to User collection
//                        required: true,
//                    },
//         roomId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Room", // Correct reference to Room collection
//             required: true,
//         },
//         checkInDate: {
//             type: Date,
//             required: true,
//         },
//         checkOutDate: {
//             type: Date,
//             required: true,
//         },
//         totalAmount: {
//             type: Number,
//             required: true,
//         },
//         paymentStatus: {
//             type: String,
//             enum: ["Pending", "Paid", "Refunded"],
//             default: "Pending",
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Booking", BookingSchema);


const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
    {
        guestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Foreign key reference to User collection
            required: true,
        },
        guestName: {
            type: String,
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room", // Foreign key reference to Room collection
            required: true,
        },
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Refunded"],
            default: "Pending",
        },
        status: {
            type: String,
            enum: ["Confirmed", "Checked-In", "Checked-Out"],
            default: "Confirmed",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);