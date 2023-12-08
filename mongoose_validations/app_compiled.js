const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./routers/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", User); // mongoose.connect('mongodb://localhost:27017/Validator')

mongoose.connect("mongodb://localhost:27017/Mongoose").then((data) => {
  // console.log("Database 'Validator' Connected")
  console.log("Database 'Mongoose' Connected");
  console.log("--------------------------------");
});

app.listen(3000, (err, data) => {
  if (err) console.log("error connecting port");

  console.log("Up and Running on Port:3000");
});
