// const bcrypt = require("bcrypt");
// const userDB = require("../dataBase/db.json");
// const { router } = require("./user");

// router.post("/register", async (req, res) => {
//   const { name, email, passwor } = req.body;
//   console.log(name);
//   try {
//     const user = userDB.filter((user) => user.email === email);
//     console.log(Boolean(user)); // true = []
//     if (!user) {
//       return res.status(400).json({ error: "El usuario ya existe" });
//     }
//     const salt = await bcrypt.genSalt(10);
//   } catch (error) {}
//   res.send("OK");
// });
