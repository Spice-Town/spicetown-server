const ModImg = require('../Models/modImg');
const cloudinary = require('cloudinary').v2;

async function createModImg(req, res, next) {
  try {
    const data = req.body;

    console.log(data);
  
    const uploadResult = await cloudinary.uploader.upload(data.file, {
      folder: data.folder,
    });

    console.log(uploadResult);

    const newItemData = {
      url: uploadResult.secure_url,
      id: uploadResult.public_id,
      post_id: data.post_id,
    };

    const newItem = await ModImg.create(newItemData);

    res.status(201).send(newItem);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}


async function getAllModImgs(req, res, next) {
  try {
    const items = await ModImg.find();
    res.status(200).send(items);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}


async function deleteModImg(req, res, next) {
  try {
    const { id } = req.params;

    // Get the public ID of the item from the database
    const item = await ModImg.findById(id);
    const publicId = item.id;

    // Delete the asset from Cloudinary using the public ID
    await cloudinary.uploader.destroy(publicId);

    // Delete the item from the database
    await ModImg.findByIdAndDelete(id);

    res.status(204).end();
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}



module.exports = { createModImg, getAllModImgs, deleteModImg };
