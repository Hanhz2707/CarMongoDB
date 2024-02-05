const express = require('express');
//import mongoose library
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use('/', router);

//MongoDB connection
const mongoURL = 'mongodb+srv://huyanh:huyanh@cardb.3ze1jx8.mongodb.net/cardb?retryWrites=true&w=majority';
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
