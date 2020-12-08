const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const product = new Schema(
  {
    title: String,
    smallDescription: String,
    description: String,
    price: Number,
    category: String,
    city: String,
    imageUrl: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', product);