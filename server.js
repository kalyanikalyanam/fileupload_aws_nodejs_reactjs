const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const companion = require("@uppy/companion");
const path = require("path");

const router = express.Router();

const app = express();

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// We export the router so that the server.js file can pick it up
module.exports = router;

const profile = require("./routes/api/profile");
app.use("/api/profile", profile);

// app.use(session({ secret: "keyboard cat" }));

// const options = {
//   providerOptions: {
//     drive: {
//       key:
//         "302650639415-v9c2ac7s4503mfpa0smqbrlk2qidlk3m.apps.googleusercontent.com",
//       secret: "MzgeDgqjMyENvZ1wuYZBzYSu",
//     },
//   },
//   server: {
//     host: "localhost:5000",
//     protocol: "http",
//     // This MUST match the path you specify in `app.use()` below:
//     path: "/companion",
//   },
//   filePath: "/path/to/folder/",
// };

// app.use("/companion", companion.app(options));

// Combine react and node js servers while deploying( YOU MIGHT HAVE ALREADY DONE THIS BEFORE
// What you need to do is make the build directory on the heroku, which will contain the index.html of your react app and then point the HTTP request to the client/build directory

if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
// const server = app.listen(PORT);

// companion.socket(server, options);
// Set up a port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
