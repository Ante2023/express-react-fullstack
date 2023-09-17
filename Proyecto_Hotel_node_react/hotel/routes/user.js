const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const userDB = require("../dataBase/db.json");

// const app = express();
const router = express.Router();
const createJWT = require("../utils/createJWT");
const {
  authenticateMddWare,
} = require("../middleware/authenticate");
// const generateJWT = require("../utils/createJWT");

router.get("/", (req, res) => {
  res.send("Hello World User!");
});

//http://localhost:5000/user/register
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const user = userDB.filter((user) => user.email === email);
    if (user.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const salt = await bcrypt.genSalt(10);
    //console.log(salt);//$2b$10$QHJzV0XUbZHvn.NmNe/sXu
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);//$2b$10$kzN4k1S8qiRUFIecdXRnAeYBBh1KSHGu4lxbX.NoM4chmunU1SiR6
    let userBooking = {
      id: userDB.length,
      name,
      email,
      password: hashedPassword,
    };
    userDB.push(userBooking);
    //hotel/dataBase/db.json
    await fs.writeFileSync("./dataBase/db.json", JSON.stringify(userDB));

    const jwtToken = createJWT(userBooking.id);
    //console.log(jwtToken);//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6MH0sImlhdCI6MTY5NDYyMTc4MywiZXhwIjoxNjk0NjI1MzgzfQ.zXJEC3MTuyfZAXTueRhD2I6QVg85ggVGjAZfdhKXTEo
    return res.status(201).json({ jwtToken, isAuthetication: true });
  } catch (error) {
    console.log("Error en register :", error.message);
    res.status(500).json({ error: error.message });
  }
});
//http://localhost:5000/user/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = userDB.filter((user) => user.email === email);
    if (user.length === 0) {
      return res
        .status(401)
        .json({ error: "Email Invalidas", isAuthenticated: false });
    }
    const validaPassword = await bcrypt.compare(password, user[0].password);
    console.log(validaPassword); //true si ampos passwords son = y false si son !=
    if (!validaPassword) {
      return res
        .status(401)
        .json({ error: "Password Incorrecto", isAuthenticated: false });
    }
    const newJwtToken = createJWT(user[0].id);
    return res
      .status(200)
      .json({ jwtToken: newJwtToken, isAuthenticated: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

//http://localhost:5000/user/auth
router.post("/auth", authenticateMddWare, (req, res) => {
  console.log("user", req.user); //user { idUser: 0 }

  try {
    res.status(200).json({ isAuthenticated: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message, isAuthenticated: false });
  }
});
module.exports = router;

/*
jwt register:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6MH0sImlhdCI6MTY5NDYyNDY2NCwiZXhwIjoxNjk0NjI4MjY0fQ.SNI_wg7rNfo90u89X1g-Zao-PK1NFc92Gl_eljTyjQM
jwt login:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6MH0sImlhdCI6MTY5NDYyNDczMCwiZXhwIjoxNjk0NjI4MzMwfQ.I6xykt3DxH1KPzQ-5psMy0muDm1I6liBKNOfSSk34VA

AMBOS SON DIFERENTES !!!


req.header
output:
{
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6MH0sImlhdCI6MTY5NDgwMjA2NiwiZXhwIjoxNjk0ODA1NjY2fQ.f62C0tSxr1O_QAHMsgOxMTnshn3LiGJOuB71He6O50Y',
  'content-type': 'application/json',
  'user-agent': 'PostmanRuntime/7.29.3',
  accept: '*\/*',
  'postman-token': 'e784002a-ab6d-4739-8451-aa0949dfe69b',
  host: 'localhost:5000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '60'
}
*/
