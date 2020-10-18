const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    type: {
      type: String,
      enum: ['personal', 'professional'],
      default: 'personal',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('contact', ContactSchema);
