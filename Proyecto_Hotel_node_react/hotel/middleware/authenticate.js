const jwt = require("jsonwebtoken");
require("dotenv").config();

const extractJwt = (bearerJwt) => {
  try {
    return bearerJwt.split(" ")[1];
  } catch (error) {
    console.log(error.message);
    return undefined;
  }
};
//Middleware "filtro" que lee los request de cliente
const authenticateMddWare = (req, res, next) => {
  let bearerToken = req.header("authorization");
  if (!bearerToken) {
    return res.status(403).json({
      message: "Authorización Denegada",
      isAuthenticated: false,
    });
  }
  token = bearerToken.split(" ")[1];
  try {
    // console.log(token); //TOKENS IGUALES
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6MH0sImlhdCI6MTY5NDgwNjYyMywiZXhwIjoxNjk0ODEwMjIzfQ.syX-gJumdTO3ZOWds6vEkBFMjsO_Rcd9Ou1yAk93u9I
    const payloadJwt = jwt.verify(token, process.env.secretJWT);
    // console.log("payloadJwt", payloadJwt);
    //payloadJwt { user: { idUser: 0 }, iat: 1694806623, exp: 1694810223 }
    req.user = payloadJwt.user;
    console.log("AUTENTICADO OK!!!");
    next();
  } catch (error) {
    res.status(401).json({ message: error.message, isAuthenticated: false });
  }
};

module.exports = { authenticateMddWare, extractJwt };
