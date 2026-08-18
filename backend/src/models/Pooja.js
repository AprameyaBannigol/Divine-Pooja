import mongoose from 'mongoose';

const poojaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pooja name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: '2-3 hrs',
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    materials: [{ type: String }],
    occasion: {
      type: String,
      index: true,
    },
    categories: [{ type: String, index: true }],
    cities: [{ type: String, index: true }],
    priestRequirements: {
      type: String,
      default: '1 Vedic Priest',
    },
    image: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    reviewCount: {
      type: Number,
      default: 0,
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

const Pooja = mongoose.model('Pooja', poojaSchema);
export default Pooja;
