import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
      trim: true,
      /**
       * Accepts: 9876543210 | +919876543210 | 919876543210
       * Allows 10–15 digits (with optional leading + sign).
       */
      match: [
        /^\+?[0-9]{10,15}$/,
        'Please provide a valid phone number (10–15 digits, optional + prefix)',
      ],
      index: true, // Primary login field — heavily queried
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Never return password in queries by default
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
        default: [78.9629, 20.5937], // Default: geographic center of India
        validate: {
          validator: function (coords) {
            return (
              coords.length === 2 &&
              coords[0] >= -180 && coords[0] <= 180 &&
              coords[1] >= -90  && coords[1] <= 90
            );
          },
          message: 'Coordinates must be valid [longitude, latitude]',
        },
      },
      // Address is optional — not all farmers have precise addresses
      address: {
        type: String,
        trim: true,
        default: '',
      },
    },
    preferredLanguage: {
      type: String,
      default: 'en',
      enum: {
        values: ['en', 'hi', 'te', 'ta', 'kn', 'mr', 'bn', 'gu', 'pa'],
        message: '{VALUE} is not a supported language code',
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Geospatial index — used for proximity-based buyer matching
userSchema.index({ location: '2dsphere' });

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Hash password before any save if the password field was modified. */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ─── Instance Methods ─────────────────────────────────────────────────────────

/** Compare a plaintext password against the stored bcrypt hash. */
userSchema.methods.matchPassword = async function (enteredPassword) {
  // password field uses select:false — must be re-selected when calling matchPassword
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
