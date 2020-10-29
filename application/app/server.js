const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hpp = require("hpp");
const morgan = require("morgan");
// const passport = require("./server/lib/passport");
const session = require("express-session");
const aws = require("aws-sdk");

const app = express();

app.use(bodyParser.json());
app.use(hpp());
app.use(morgan("dev"));
app.use(
  session({
    secret: "secretKeyHere",
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

//aws
aws.config.loadFromPath("./aws/config.json");
// AWS_ACCESS_KEY_ID
// AWS_SECRET_ACCESS_KEY
// AWS_SESSION_TOKEN (optional)
aws.config.update({ region: "us-west-1" });
//end

// routes
const mainRouter = require("./backend/routes");
app.use("/api", mainRouter);

app.use(express.static(path.join(__dirname, "build")));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// end

var server = app.listen(process.env.PORT || 5000, () => {
  var port = server.address().port;
  console.log("app listening at port", port);
});
