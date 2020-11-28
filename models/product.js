const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const product = new Schema(
  {
    title: String,
    smallDescription: String,
    description: String,
    price: Number,
    category: String,
    location: String,
    imageUrl: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },

  },
  {
    timestamps: true
  }
);

module.exports = model('Product', product);