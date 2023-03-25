require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const itemRouter = require('./Routes/ItemRoutes');
const emailRouter = require('./Routes/emailRoutes');
const modImgRouter = require('./Routes/modImgRoutes');




const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// eslint-disable-next-line no-unused-vars
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database!');
});

app.use(itemRouter);
app.use(emailRouter);
app.use(modImgRouter);

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
