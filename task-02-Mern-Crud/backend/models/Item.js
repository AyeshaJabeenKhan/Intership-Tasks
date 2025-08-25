// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,      // validation: must be provided
      trim: true,          // remove leading/trailing spaces
      minlength: 2
    },
    description: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true // adds createdAt, updatedAt automatically
  }
);

// Model = the class you use in code to read/write items
module.exports = mongoose.model('Item', itemSchema);
