const jwt = require("jsonwebtoken");
require("dotenv").config();

function createJWT(idUser) {
  const payload = {
    user: {
      idUser,
    },
  };
  let tokenJWT = jwt.sign(payload, process.env.secretJWT, { expiresIn: "1h" });
  //console.log(tokenJWT); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6MH0sImlhdCI6MTY5NDYyMTc4MywiZXhwIjoxNjk0NjI1MzgzfQ.zXJEC3MTuyfZAXTueRhD2I6QVg85ggVGjAZfdhKXTEo
  return tokenJWT;
}

module.exports = createJWT;
