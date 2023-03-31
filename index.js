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

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB database!');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(itemRouter);
app.use(emailRouter);
app.use(modImgRouter);

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.get('/start-server', (req, res) => {
  // If the server is already running, return a success message
  if (app.serverRunning) {
    return res.send({ message: 'Server already running' });
  }

  app.server = app.listen(3001, () => {
    console.log('Server listening on port 3001');
    app.serverRunning = true;
    return res.send({ message: 'Server started' });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  if (app.serverRunning) {
    return res.send({ status: 'ok' });
  } else {
    return res.status(500).send({ status: 'error' });
  }
});

app.server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
  app.serverRunning = true;
});

module.exports = app;
