const express = require('express');
const connectToDB = require('./config/db');
const router = require('./routes');
const ejs = require('ejs');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/',router)

app.listen(process.env.PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});
