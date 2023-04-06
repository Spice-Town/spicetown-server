# Spice Town Guitar Repair Shop Backend

This is the backend code for the Spice Town Guitar Repair Shop web application. It provides API endpoints for creating, updating, and deleting items, as well as sending repair requests via email.

## Installation

To install the application, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Run `nodemon` to start server.


## Technologies
This application was built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- Mailgun
- Dotenv

## Usage

Once the application is installed, you can start the server by running npm start or nodemon. By default, the server listens on port 3001.

## Endpoints

The following endpoints are available:

/item
- GET /item: Returns a list of all items.
- POST /item: Creates a new item.
- GET /item/:id: Returns the item with the specified ID.
- PUT /item/:id: Updates the item with the specified ID.
- DELETE /item/:id: Deletes the item with the specified ID.

 /mod_img
- GET /mod_img: Returns a list of all modal images.
- POST /mod_img: Creates a new modal image.
- DELETE /mod_img/:id: Deletes the modal image with the specified ID.

/mail
- POST /mail: Sends a repair request email to the shop.


## Configuration

The following environment variables must be set:

- CLOUDNAME: Cloudinary cloud name.
- CLOUDAPIKEY: Cloudinary API key.
- CLOUDINARYSECRET: Cloudinary API secret.
- MONGO: MongoDB connection URI.
- MAILGUN_KEY: Mailgun API key.
- MAILGUN_DOMAIN: Mailgun domain.

You can set these variables in a .env file in the root directory of the application.

License
See the LICENSE file for details.
