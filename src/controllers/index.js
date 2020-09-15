const path = require("path");

const { loadNotes, saveNotes } = require("../services/index");
const dbFile = path.resolve(__dirname, "../db/notes.json");

const createNote = (req, res) => {
  const notes = loadNotes(dbFile);
  let id = notes.length;
  let body = req.body;

  let note = { ...body, id };
  notes.push(note);

  try {
    saveNotes(notes, dbFile);
    res.status(200);
    res.json(note);
  } catch (e) {
    const message = { error: "Couldn't add note", errorMessage: e.message };
    res.status(400);
    res.json(message);
  }
};

module.exports = { createNote };
