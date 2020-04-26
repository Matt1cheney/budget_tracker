const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client"));
// app.use(express.static('dist'));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://matt1cheney:Gradybum33!@alphacluster-fbyr2.gcp.mongodb.net/budget?authSource=admin", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
