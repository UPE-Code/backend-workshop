const express = require("express");

const { createNote } = require("../controllers/index");

const apiRouter = express.Router();

apiRouter.post("/", (req, res) => {
  try {
    createNote(req, res);
    res.status(200);
    res.json(req.body);
  } catch (e) {
    const message = { error: "Couldn't add note", errorMessage: e.message };
    res.status(400);
    res.json(message);
  }
});

module.exports = apiRouter;
