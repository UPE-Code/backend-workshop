const express = require("express");

const apiRouter = require("./routes/index");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port :${PORT} 🚀`);
});
