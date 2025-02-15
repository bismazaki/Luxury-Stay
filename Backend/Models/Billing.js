const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
    InvoiceId: {type: String, required: true, unique: true},
    GuestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    BookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    ServiceCharges: { type: String,
        enum: ['Food', 'Laundry', 'ExtraBed'],
        default: 'Food',
    },
    TotalAmount: {type: String, required: true},
    PaymentMode: {type: String,
        enum: ['Cash', 'Card','online' ],
        default: 'Cash',
    },
    InvoiceDate: {type: Date, default: Date.now}



    });

    module.exports = mongoose.model('Billing', BillingSchema);