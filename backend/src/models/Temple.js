import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Temple name is required'],
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
    deity: {
      type: String,
      required: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'India',
    },
    address: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Shrine',
      index: true,
    },
    images: [{ type: String }],
    website: {
      type: String,
      default: '',
    },
    timings: {
      type: String,
      default: '06:00 AM - 09:00 PM',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Temple = mongoose.model('Temple', templeSchema);
export default Temple;
