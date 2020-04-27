require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const compression = require('compression')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression())


jsDirectory = process.env.NODE_ENV === 'production' ? 'build' : 'dist';

// app.use(express.static(path.join(__dirname, 'client', 'assets')));
// app.use(express.static(path.join(__dirname, 'client',jsDirectory)));
app.use(express.static("client"));
app.use(express.static("assets"));
app.use(express.static(jsDirectory));

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_DATABASE , {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
