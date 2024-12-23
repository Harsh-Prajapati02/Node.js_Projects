const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;