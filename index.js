const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contactDance", {
  useNewUrlParser: true,
});
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
const port = 80;

// Express Stuff
app.use("/static", express.static("static"));
app.use(express.json());
app.use(express.urlencoded());

// Pug Stuff
app.set("views engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Mongoose Sechma

const contectSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  message: String,
});

const Contact = mongoose.model("contact", contectSchema);
// Rout Staff

app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});

app.get("/about.pug", (req, res) => {
  res.status(200).render("about.pug");
});

app.get("/dance.pug", (req, res) => {
  res.status(200).render("dance.pug");
});

app.get("/classes.pug", (req, res) => {
  res.status(200).render("classes.pug");
});

app.get("/contact.pug", (req, res) => {
  res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
  const mydata = new Contact(req.body);
  mydata
    .save()
    .then(() => {
      res.status(200).render("contact.pug");
    })
    .catch(() => {
      res.status(400).send("Data is not send");
    });
});

app.listen(port, () => {
  console.log(`This web run on this port ${port}`);
});
