import mongoose from 'mongoose';

const muhurtaSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        'WEDDING',
        'GRUHA_PRAVESH',
        'NAMING_CEREMONY',
        'BUSINESS',
        'FESTIVAL',
        'EKADASHI',
        'AMAVASYA',
        'PURNIMA',
        'OTHER',
      ],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    tithi: {
      type: String,
      default: '',
    },
    nakshatra: {
      type: String,
      default: '',
    },
    rahuKalam: {
      type: String,
      default: '',
    },
    abhijitMuhurta: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'General',
      index: true,
    },
    source: {
      type: String,
      default: 'Development Sample Panchang',
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

const Muhurta = mongoose.model('Muhurta', muhurtaSchema);
export default Muhurta;
