const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, default: '' },
    type: {
      type: String,
      enum: ['Royal Suites', 'Executive Rooms', 'Garden Villas', 'Penthouse'],
      required: true,
    },
    description: { type: String, default: '' },
    pricePerNight: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    sizeSqFt: { type: Number, default: 0 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    badge: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
