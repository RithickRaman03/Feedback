const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const feedback = require("./routes/translatorfeedback");

app.get("/translatorfeedback", feedback);
const feedbackans = require("./routes/translatorfeedback");
app.post("/store-feedback", feedbackans);
module.exports = app;
