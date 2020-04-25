const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    index: "./assets/js/index.js",
    db: "./assets/js/db.js",

  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget Tracker",
      description: " This application allows you to track your funds and keep a good budget.",
      background_color: "#01579b",
      theme_color: "#ffffff",
      theme_color: "#ffffff",
      start_url: "/",
      icons: [{
        src: path.resolve("./assets/images/icons/android-chrome-192x192.png"),
        sizes: [16, 32, 192, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ]
};

module.exports = config;
