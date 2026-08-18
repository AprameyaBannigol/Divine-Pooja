import mongoose from 'mongoose';

const priestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Priest name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '5+ yrs exp',
    },
    languages: [{ type: String }],
    specializations: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    serviceAreas: [{ type: String }],
    templeAssociation: {
      type: String,
      default: '',
    },
    biography: {
      type: String,
      default: '',
    },
    certificates: [{ type: String }],
    idProof: {
      type: String,
      select: false, // Exclude sensitive verification docs by default
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'],
      default: 'APPROVED',
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Priest = mongoose.model('Priest', priestSchema);
export default Priest;
