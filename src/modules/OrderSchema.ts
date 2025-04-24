import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    default: null,
  },
  material: {
    type: String,
    default: null,
  },
  functionality: {
    type: Boolean,
    default: false,
  },
  functionalityDescription: {
    type: String,
    default: null,
  },
  functionalityType: {
    type: String,
    default: null,
  },
  dimensions: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'new',
  },
  cost: {
    type: String,
    default: null,
  },
  price: {
    type: String,
    default: null,
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
