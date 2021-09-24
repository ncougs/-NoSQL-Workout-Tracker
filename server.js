const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");

const routes = require("./controllers");

const PORT = process.env.PORT || 3001

const app = express();

const hbs = exphbs.create();

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker");

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});