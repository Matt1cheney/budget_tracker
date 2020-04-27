var path = require("path");

module.exports = function(app) {

  app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/src/js/service-worker.js"));
  });  

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  });
};