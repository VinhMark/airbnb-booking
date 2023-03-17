const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  owr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  type: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  price: Number,
  maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;
