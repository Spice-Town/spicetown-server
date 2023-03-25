const express = require('express');
const { createModImg, getAllModImgs, deleteModImg } = require('../Controllers/modImgsRoutes');

const modImgRouter = express.Router();

modImgRouter.route('/mod_img')
  .post(createModImg)
  .get(getAllModImgs);

modImgRouter.route('/mod_img/:id')
  .delete(deleteModImg);

module.exports = modImgRouter;