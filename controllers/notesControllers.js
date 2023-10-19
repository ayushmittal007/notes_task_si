const {Note} = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const addNote = async (req, res) => {
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
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.body;
    await Note.deleteOne({ id: id });
    res.status(200).json({ msg: "Note deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const updateNote = async (req, res) => {
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
    res.json({ msg: "Note updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

module.exports = {
  getNotes,
  addNote,
  deleteNote,
  updateNote
};
