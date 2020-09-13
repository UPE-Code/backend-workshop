const http = require("http");

const apiRouter = require("../routes/index");

/*
  Exporting the functionality that creates the server and defines our endpoints
*/
module.exports = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "POST") {
    apiRouter.addNote(req, res);
  }
});
