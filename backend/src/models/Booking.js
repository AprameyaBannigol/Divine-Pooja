import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    pooja: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pooja',
      required: [true, 'Pooja ID is required'],
    },
    priest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Priest',
      required: [true, 'Priest ID is required'],
      index: true,
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
      index: true,
    },
    timeSlot: {
      startTime: {
        type: String,
        required: [true, 'Start time is required'],
      },
      endTime: {
        type: String,
        required: [true, 'End time is required'],
      },
    },
    location: {
      type: {
        type: String,
        enum: ['HOME', 'TEMPLE'],
        default: 'HOME',
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
      },
    },
    devoteeDetails: {
      name: {
        type: String,
        required: [true, 'Devotee name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Devotee contact phone is required'],
        trim: true,
      },
      gotra: {
        type: String,
        trim: true,
        default: '',
      },
      specialInstructions: {
        type: String,
        trim: true,
        default: '',
      },
    },
    pricing: {
      poojaPrice: {
        type: Number,
        required: [true, 'Pooja price snapshot is required'],
      },
      additionalCharges: {
        type: Number,
        default: 0,
      },
      totalAmount: {
        type: Number,
        required: [true, 'Total amount snapshot is required'],
      },
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    cancellationReason: {
      type: String,
      default: '',
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Unique Partial Index to prevent active double bookings for the same priest, date, and slot
bookingSchema.index(
  { priest: 1, bookingDate: 1, 'timeSlot.startTime': 1 },
  {
    unique: true,
    name: 'unique_active_priest_slot',
    partialFilterExpression: {
      status: { $in: ['PENDING', 'CONFIRMED'] },
    },
  }
);

// Index for fast query of user's bookings sorted by date
bookingSchema.index({ user: 1, createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
