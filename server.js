const path = require('path');
const express = require("express");
const mongoose = require("mongoose");

const routes = require("./controllers");

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker");

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});