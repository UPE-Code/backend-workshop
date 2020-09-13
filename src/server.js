const http = require("http");
const server = require("./controller/index");

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port :${PORT} 🚀`);
});
