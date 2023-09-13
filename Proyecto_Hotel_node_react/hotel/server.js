const express = require("express");
const cors = require("cors");
const bookings = require("./bookings");
const user = require("./routes/user");
const app = express();
// const app = express();
app.use(express.json());
app.use(cors());
//Use this array as your (in-memory) data store.
const bookingsJSON = require("./bookings.json");
app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookingsJSON, etc.");
});

// TODO add your routes and helper functions here

app.use("/bookings", bookings);
app.use("/user", user);


let port = 5000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
