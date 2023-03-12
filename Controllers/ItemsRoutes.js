const Item = require('../Models/item');
const cloudinary = require('cloudinary').v2;

async function createItem(req, res, next) {
  try {
    const data = req.body;
  
    const uploadResult = await cloudinary.uploader.upload(data.file, {
      folder: data.folder,
    });

    const newItemData = {
      url: uploadResult.secure_url,
      id: uploadResult.public_id,
      title: data.title,
      description: data.description,
      date: data.date,
    };

    const newItem = await Item.create(newItemData);

    res.status(201).send(newItem);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}


async function getAllItems(req, res, next) {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function getItem(req, res, next) {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      res.status(404).send('Item not found');
    } else {
      res.status(200).send(item);
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;

    // Get the public ID of the item from the database
    const item = await Item.findById(id);
    const publicId = item.id;

    // Delete the asset from Cloudinary using the public ID
    await cloudinary.uploader.destroy(publicId);

    // Delete the item from the database
    await Item.findByIdAndDelete(id);

    res.status(204).end();
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function updateItem(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      res.status(404).send('Item not found');
    } else {
      res.status(200).send(updatedItem);
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

module.exports = { createItem, getAllItems, getItem, deleteItem, updateItem };
