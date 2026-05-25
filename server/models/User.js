import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number (E.164 format)'],
      index: true, // Primary login field - heavy index
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: {
        values: ['farmer', 'buyer', 'admin'],
        message: '{VALUE} is not a valid role (must be: farmer, buyer, or admin)',
      },
      required: [true, 'Please specify a role'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: [true, 'Please provide location coordinates'],
        validate: {
          validator: function (coords) {
            return coords.length === 2 && 
                   coords[0] >= -180 && coords[0] <= 180 && 
                   coords[1] >= -90 && coords[1] <= 90;
          },
          message: 'Coordinates must be valid [longitude, latitude]',
        },
      },
      address: {
        type: String,
        required: [true, 'Please provide an address'],
        trim: true,
      },
    },
    preferredLanguage: {
      type: String,
      default: 'en',
      enum: ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'bn', 'gu', 'pa'], // English, Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, Gujarati, Punjabi
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Geo-spatial index for location querying
userSchema.index({ location: '2dsphere' });

// pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
