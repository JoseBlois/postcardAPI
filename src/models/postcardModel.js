const mongoose = require('mongoose');

const { Schema } = mongoose;

const postcardModel = new Schema(
  {
    title: { type: String },
    description: { type: String },
    rating: { type: Number },
    image: { type: String },
  },
);

module.exports = mongoose.model('Postcard', postcardModel);
