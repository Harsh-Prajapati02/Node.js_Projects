const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: String,
    body: String,
    notesImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZNNdkTJ-dnUm4YXT9zzqkv0uMu-NxdnIk7w&s"
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;