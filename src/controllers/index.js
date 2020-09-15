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

const readNote = (req, res) => {
  const notes = loadNotes(dbFile);
  let { id } = req.params;

  id = Number(id);

  const note = notes.find((note) => note.id === id);

  if (note !== undefined) {
    res.status(200);
    res.json(JSON.stringify(note));
  } else {
    const message = { error: "No such note found" };
    res.status(400);
    res.json(message);
  }
};

const readNotes = (req, res) => {
  const notes = loadNotes(dbFile);

  if (notes.length > 0) {
    res.status(200);
    res.json(notes);
  } else {
    const message = { error: "Notes array empty" };
    res.status(400);
    res.json(message);
  }
};

module.exports = { createNote, readNote, readNotes };
