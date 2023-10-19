const express = require("express");
const notesRouter = express.Router();
const  {Note}  = require("../models/Note");

notesRouter.get("/get", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (e) {
    console.log(e)
    res.status(500).json({ "error" : e });
  }
});
notesRouter.post("/add", async (req, res) => {
  try {
    const { id, title, content } = req.body;
    let newNote = new Note({
      id,
      title,
      content,
    });
    newNote = await newNote.save();
    res.json(newNote);
  } catch (e) {
    console.log(e)
    res.status(500).json({ "error" : e });
  }
});

notesRouter.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ id: id });
    res.status(200).json({ msg: "Note deleted succesfully" });
  } catch (e) {
    console.log(e)
    res.status(500).json({ "error" : e });
  }
});

notesRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { id: id },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.json({msg : "Node updated successfully"});
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

module.exports = notesRouter;