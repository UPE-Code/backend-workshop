const express = require("express");

const { createNote, readNote, readNotes } = require("../controllers/index");

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

module.exports = apiRouter;
