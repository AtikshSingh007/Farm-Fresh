import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A listing must be linked to a farmer'],
      index: true,
    },
    cropName: {
      type: String,
      required: [true, 'Please provide the crop name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please specify the crop category'],
      enum: {
        values: ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Oilseeds', 'Other'],
        message: '{VALUE} is not a valid crop category',
      },
      trim: true,
    },
    quantityAvailable: {
      type: Number,
      required: [true, 'Please provide the quantity available'],
      min: [1, 'Quantity must be at least 1 unit'],
    },
    unit: {
      type: String,
      required: [true, 'Please specify the unit (kg/quintals)'],
      enum: {
        values: ['kg', 'quintals'],
        message: 'Unit must be either kg or quintals',
      },
      default: 'kg',
    },
    minimumPricePerKg: {
      type: Number,
      required: [true, 'Please specify the minimum price per kg in local currency'],
      min: [0.01, 'Minimum price must be greater than zero'],
    },
    expectedHarvestDate: {
      type: Date,
      required: [true, 'Please select the expected harvest date'],
    },
    status: {
      type: String,
      enum: {
        values: ['available', 'pooling', 'sold', 'expired'],
        message: '{VALUE} is not a valid listing status',
      },
      default: 'available',
      index: true,
    },
    imageURL: {
      type: String,
      default: '',
    },
    analytics: {
      views: {
        type: Number,
        default: 0,
        min: 0,
      },
      offers: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Indexes to speed up marketplace search operations
listingSchema.index({ cropName: 'text', category: 'text' });
listingSchema.index({ status: 1, expectedHarvestDate: 1 });
listingSchema.index({ minimumPricePerKg: 1 });

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
