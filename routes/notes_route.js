const express = require("express");
const notesRouter = express.Router();
const notesController = require("../controllers/notesControllers");
notesRouter.get("/get", notesController.getNotes);
notesRouter.post("/add", notesController.addNote);
notesRouter.delete("/delete", notesController.deleteNote);
notesRouter.put("/update/:id", notesController.updateNote);

module.exports = notesRouter;