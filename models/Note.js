const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});
const Note = mongoose.model("notes", notesSchema);
module.exports = { Note };