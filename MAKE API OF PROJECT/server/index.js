require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/user.routes');
const connectDB = require('./utils/db');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
