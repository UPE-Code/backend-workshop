const http = require("http");
const url = require("url");

const apiRouter = require("../routes/index");

/*
  Exporting the functionality that creates the server and defines our endpoints
*/
module.exports = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);

  if (pathname === "/api" && req.method === "POST") {
    apiRouter.addNote(req, res);
  } else if (pathname === "/api" && query && req.method === "GET") {
    apiRouter.readNote(req, res);
  } else if (pathname === "/api" && req.method === "GET") {
    apiRouter.readNotes(req, res);
  }
});
