const express = require("express");
const { createNotes, deleteNotes, getAllNotesByUser, getSingleNoteByUser, updateNotes, getAllNotesByAdmin, deleteAllNotesByAdmin } = require("../controllers/notes.controllers");
const isAuth = require("../middleware/Auth");
const upload = require("../middleware/multer");
const isAdmin = require("../middleware/CheckRole");

const notesRouter = express.Router();

// ======= User Routes ======= //
// Create Notes
notesRouter.post("/create",  isAuth, createNotes);

// Delete Notes
notesRouter.delete("/delete/:notesId", isAuth, deleteNotes);

// Get All Notes of Single User
notesRouter.get("/get/:userId", isAuth, getAllNotesByUser);

// Get Single Note
notesRouter.get("/getSingleNote/:notesId", isAuth, getSingleNoteByUser);

// Update Notes
notesRouter.patch("/update/:notesId", isAuth, upload.single("file"), updateNotes);

// ======= Admin Routes ======= //
// Get All Notes of All Users by Admin
notesRouter.get("/getAllNotes", isAuth, isAdmin, getAllNotesByAdmin);

// Delete All Notes by Admin
notesRouter.delete("/deleteAllNotes", isAuth, isAdmin, deleteAllNotesByAdmin);

module.exports = notesRouter;