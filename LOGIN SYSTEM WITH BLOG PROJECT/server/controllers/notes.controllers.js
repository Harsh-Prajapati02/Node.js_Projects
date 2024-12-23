const notesModel = require("../models/notes.model");

// ======= User Routes ======= //
// Create Notes
const createNotes = async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ message: "Please provide both title and body" });
    };

    try {
        console.log(req.user);
        await notesModel.create({ title, body, userId: req.user._id });
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Delete Notes
const deleteNotes = async (req, res) => {
    const { notesId } = req.params;

    const isExistNotes = await notesModel.findById(notesId);

    if (!isExistNotes) {
        return res.status(404).json({ message: "Notes not found" });
    }

    if (isExistNotes.userId != req.user._id) {
        return res.status(403).json({ message: "You don't have permission to delete this note" });
    }

    await notesModel.findByIdAndDelete(notesId);
    res.status(200).json({ message: "Notes deleted successfully" });
};

// Get All Notes of User
const getAllNotesByUser = async (req, res) => {
    const { userId } = req.params;

    if (userId != req.user._id) {
        return res.status(403).json({ message: "You don't have permission to get notes" });
    };

    try {
        const notes = await notesModel.find({ userId });

        if (!(notes.length) > 0) {
            return res.status(404).json({ message: "Notes not found" });
        };

        res.status(200).json({ message: "Notes Fetched Successfully", notes });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Get Single Note of User
const getSingleNoteByUser = async (req, res) => {
    const { notesId } = req.params;

    try {
        const isExistNote = await notesModel.findById(notesId);

        if (!isExistNote) {
            return res.status(404).json({ message: "Notes not found" });
        }

        if (isExistNote.userId != req.user._id) {
            return res.status(403).send({ message: "You don't have permission to get this note" });
        }

        res.status(200).json({ message: "Note Get Successfully", note: isExistNote });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// Update Notes
const updateNotes = async (req, res) => {
    const { notesId } = req.params;

    try {
        const isExistNote = await notesModel.findById(notesId);

        if (!isExistNote) {
            return res.status(404).json({ message: "Notes not found" });
        };

        if (isExistNote.userId != req.user._id) {
            return res.status(403).send({ message: "You don't have permission to update this note" });
        };

        if (req.file) {
            await notesModel.findByIdAndUpdate(notesId, {
                ...req.body,
                notesImage: req.file.originalname,
            });

            res.status(200).json({ message: "Notes Updated Successfully" });
        } else {
            await notesModel.findByIdAndUpdate(notesId, req.body);
            res.status(200).json({ message: "Notes Updated Successfully" });
        };
    } catch (error) {
        res.status(400).json({ message: error });
    };
}

// ======= Admin Routes ======= //
// Get All Notes of All Users by Admin
const getAllNotesByAdmin = async (req, res) => {
    try {
        const allNotes = await notesModel.find();

        if ( allNotes.length == 0) {
            return res.status(404).json({ message: "No Notes Found" });
        };

        res.status(200).json({ message: "All Notes Get Successfully", notes: allNotes });
    } catch (error) {
        res.status(400).json({ message: error });
    };
};

// Delete All Notes by Admin
const deleteAllNotesByAdmin = async (req, res) => {
    try {
        await notesModel.deleteMany();
        res.status(200).json({ message: "All Notes Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

module.exports = { createNotes, deleteNotes, getAllNotesByUser, getSingleNoteByUser, updateNotes, getAllNotesByAdmin, deleteAllNotesByAdmin };