const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;


