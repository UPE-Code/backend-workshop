const express = require("express");

const {
  createNote,
  readNote,
  readNotes,
  updateNote,
  deleteNote,
} = require("../controllers/index");

const apiRouter = express.Router();

apiRouter.post("/", (req, res) => {
  createNote(req, res);
});

apiRouter.get("/:id", (req, res) => {
  readNote(req, res);
});

apiRouter.get("/", (req, res) => {
  readNotes(req, res);
});

apiRouter.put("/:id", (req, res) => {
  updateNote(req, res);
});

apiRouter.delete("/:id", (req, res) => {
  deleteNote(req, res);
});

module.exports = apiRouter;
