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
    res.json(note);
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

const updateNote = (req, res) => {
  let notes = loadNotes(dbFile);

  let { id } = req.params;
  id = Number(id);

  let foundNote = notes.find((note) => note.id === id);
  notes = notes.filter((note) => note.id !== id);

  if (foundNote !== undefined) {
    const note = { ...foundNote, id };
    notes.push(note);
    notes.sort((a, b) => (a > b ? 1 : -1));
    saveNotes(notes, dbFile);

    res.status(200);
    res.json(note);
  } else {
    const message = { error: "No such note found" };
    res.status(400);
    res.json(message);
  }
};

const deleteNote = (req, res) => {
  let notes = loadNotes(dbFile);

  let { id } = req.params;
  id = Number(id);

  const foundNote = notes.find((note) => note.id === id);
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (notes.length > filteredNotes.length) {
    res.status(200);
    res.json(foundNote);
    saveNotes(filteredNotes, dbFile);
  } else {
    const message = { error: "No note removed" };

    res.json(message);
    res.status(400);
  }
};

module.exports = { createNote, readNote, readNotes, updateNote, deleteNote };
