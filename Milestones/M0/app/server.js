const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const hpp = require("hpp");

const db = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(helmet());
app.use(hpp());

app.post("/contact", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.description) {
    return res.send({ error: true });
  }
  try {
    await db.addUser(req.body.name, req.body.email, req.body.description);
  } catch (error) {
    return res.send({ error: true });
  }

  return res.send({ error: false });
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("started on port:", port);
});
