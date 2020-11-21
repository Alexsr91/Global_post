const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const product = new Schema(
  {
    title: String,
    second_title: String,
    description: String,
    price: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },

  },
  {
    timestamps: true
  }
);

module.exports = model('Product', product);