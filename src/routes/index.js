const path = require("path");
const url = require("url");
const qs = require("querystring");

const { loadNotes, saveNotes } = require("../services/index");

const file = path.resolve(__dirname, "../db/notes.json");

const addNote = (req, res) => {
  const notes = loadNotes(file); // Load the array of notes
  const id = notes.length;
  let data = [];

  /*
    To get the data, we must listen to the stream of data events, and push it to an array
  */
  req.on("data", (chunk) => {
    data.push(chunk);
  });

  /*
    Once the stream ends we can work with the data and send a response back
  */
  req.on("end", () => {
    let body = JSON.parse(data); // Parses the data stream from a Buffer to JSON
    let note = { id, ...body };
    notes.push(note); // Pushes the JSON object to the notes array
    saveNotes(notes, file); // Rewrites the notes file to reflect the new notes array

    res.statusCode = 200; // Everything is good, so set response status to ok
    res.setHeader("Content-Type", "application/json"); // Tell the requester, you are going to recieve JSON
    res.end(JSON.stringify(note)); // Send the note back to the requester
  });
};

module.exports = { addNote }; // Export all api logic
