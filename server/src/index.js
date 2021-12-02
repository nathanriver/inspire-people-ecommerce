require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
