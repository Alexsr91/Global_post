const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    Name: String,
    SecondName: String,
    Address: String,
    bio: String,
    Email: String,
    Phone: String,
  },
  {
    timestamps: true
  }
);
module.exports = model('User', userSchema);