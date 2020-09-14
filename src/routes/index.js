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

/* 
  Need to get a note by title
  Return that note
*/
const readNote = (req, res) => {
  // Load the array of Notes
  const notes = services.loadNotes(file);

  // Destructure the pathname, and the querystring from the url
  const { pathname, query } = url.parse(req.url);

  // Destructure the id from the querystring
  const { id } = qs.parse(query);

  const note = notes.find((note) => Number(id) === note.id); // Compare the id of each note to the id. If there is a match, return that note, if not return undefined

  if (note !== undefined) {
    res.statusCode = 200; // Note has been found, so set response status to ok
    res.setHeader("Content-Type", "application/json"); // Tell the requester, that they are going to recieve JSON
    res.end(JSON.stringify(note)); // Return the note to the requester
  } else {
    message = { error: "Note not found" }; // Create an error object
    res.statusCode = 400; // Note has not been found so set response status to Bad Request
    res.setHeader("Content-Type", "application/json"); // Tell the requester, that they are going to recieve JSON
    res.end(JSON.stringify(message)); // Return the error to the requester
  }
};

const readNotes = (req, res) => {
  const notes = loadNotes(file);

  if (notes.length === 0) {
    message = { error: "No notes found" };
    res.statusCode = 400; // There are no so set response status to Bad Request
    res.setHeader("Content-Type", "application/json"); // Tell the requester, that they are going to recieve JSON
    res.end(JSON.stringify(message));
  } else {
    res.statusCode = 200; // Notes have been found, so set response status to ok
    res.setHeader("Content-Type", "application/json"); // Tell the requester, that they are going to recieve JSON
    res.end(JSON.stringify(notes)); // Return the notes to the requester
  }
};

/*
  First have to find the note to update
  Then have to update note
  Finaly save note and return edited note
*/

const updateNotes = (req, res) => {
  let notes = loadNotes(file);

  const { pathname, query } = url.parse(req.url);
  let { id } = qs.parse(query);
  id = Number(id);
  note = notes.find((note) => id === note.id);

  if (note !== undefined) {
    notes = notes.filter((note) => id !== note.id);
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });

    req.on("end", () => {
      let body = JSON.parse(data);
      note = { ...note, ...body };
      notes.push(note);
      notes = notes.sort((a, b) => (a.id < b.id ? -1 : 0));
      saveNotes(notes, file);

      res.statusCode = 200; // Everything is good, so set response status to ok
      res.setHeader("Content-Type", "application/json"); // Tell the requester, you are going to recieve JSON
      res.end(JSON.stringify(note)); // Send the note back to the requester
    });
  } else {
    const message = { error: "No such note found" };

    res.statusCode = 400; // There is no such note set response status to Bad Request
    res.setHeader("Content-Type", "application/json"); // Tell the requester, that they are going to recieve JSON
    res.end(JSON.stringify(message));
  }
};

module.exports = { addNote, readNote, readNotes, updateNotes }; // Export all api logic
