const fs = require("fs");

const loadNotes = (file) => {
  /*
    Tries to read the file and return an array containing the notes
    If the file does not exist, it will return an empty array
  */
  try {
    const dataBuffer = fs.readFileSync(file);
    return JSON.parse(dataBuffer);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes, file) => {
  /*
    Creates a JSON object from the notes array passed
    Writes that object to the file passed
  */

  const notesJson = JSON.stringify(notes);
  fs.writeFileSync(file, notesJson);
};

module.exports = { loadNotes, saveNotes };
