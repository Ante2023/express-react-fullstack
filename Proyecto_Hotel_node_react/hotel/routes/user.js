const express = require("express");
const bcrypt = require("bcrypt")
const fs = require("fs")
// const app = express();
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World User!");
});

module.exports = router;
