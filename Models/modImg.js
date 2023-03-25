const mongoose = require('mongoose');

const ModImgSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
});

const ModImg = mongoose.model('ModImg', ModImgSchema);

module.exports = ModImg;