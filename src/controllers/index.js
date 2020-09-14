const path = require("path");

const { loadNotes, saveNotes } = require("../services/index");
const dbFile = path.resolve(__dirname, "../db/notes.json");

const createNote = (req, res) => {
  const notes = loadNotes(dbFile);

  let note = JSON.stringify(req.body);
  notes.push(note);

  saveNotes(notes, dbFile);
};

module.exports = { createNote };
