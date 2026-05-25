import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: [true, 'Order item must reference a listing'],
    index: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Order item must specify a quantity'],
    min: [1, 'Quantity must be at least 1'],
  },
  pricePerKg: {
    type: Number,
    required: [true, 'Order item must capture the purchase price per kg'],
    min: [0.01, 'Price must be greater than zero'],
  },
});

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An order must be placed by a registered buyer'],
      index: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (val) {
          return val && val.length > 0;
        },
        message: 'An order must contain at least one listing item',
      },
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount must be calculated and provided'],
      min: [0, 'Total amount cannot be negative'],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'escrowed', 'released', 'refunded'],
        message: '{VALUE} is not a valid payment status',
      },
      default: 'pending',
      index: true,
    },
    logisticsStatus: {
      type: String,
      enum: {
        values: ['pending', 'dispatched', 'in-transit', 'delivered'],
        message: '{VALUE} is not a valid logistics status',
      },
      default: 'pending',
      index: true,
    },
    isPooled: {
      type: Boolean,
      default: false,
      index: true, // Enables fast filtering for logistics consolidation
    },
    poolingHubAddress: {
      type: String,
      default: '',
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

// Compound index to help track logistics state of group/pooled shipments
orderSchema.index({ isPooled: 1, logisticsStatus: 1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;
