const express = require('express');
const { createItem, getAllItems, getItem, updateItem, deleteItem } = require('../Controllers/ItemsRoute');

const itemRouter = express.Router();

itemRouter.route('/item')
  .post(createItem)
  .get(getAllItems);

itemRouter.route('/item/:id')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

module.exports = itemRouter;
