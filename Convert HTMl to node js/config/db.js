const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to the database')
    } catch (error) {
        console.log('Error connecting to the database', error)
    }
}

module.exports = connectToDB;