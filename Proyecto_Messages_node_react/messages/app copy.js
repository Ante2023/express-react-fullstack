const express = require("express");
const cors = require("cors"); //Libreria para hacer cross origin , no debo tener el mismo server de origenpa hacer peticiones, las puedo hacer de otro server
const app = express();
app.use(cors());
app.use(express.json());
let _ = require("lodash");

/*Para recoger cuerrpo de post */
const bodyParser = require("body-parser"); // middleware
app.use(bodyParser.urlencoded({ extended: false }));
/*Para recoger cuerpo de post */

var id = 1;
const welcomeMessage = {
  id: id,
  from: "Ali",
  text: "Welcome to MigraCode chat system!",
};
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

/*****     GET ALL   http://localhost:3001/messages              *****/
app.get("/messages", (request, response) => {
  // response.redirect('/');
  response.status(200).json(messages);
});

/*****    POST    http://localhost:3001/messages              *****/

let idGreat = 0;
function getIdGreaterThan(req, resp, next) {
  idGreat = messages.reduce((acc, curr) => (acc.id > curr.id ? acc : curr), 0);
  // console.log(idGreat.id);
  // return idGreat
  next();
}
const httpMsgError = (msg) => {
  return {
    code: 400,
    error: msg,
  };
};
let bodyRequestexists = "";
const validateBodyRequest = (req, res, next) => {
  bodyRequestexists = !_.isEmpty(req.body); // V= body vacio, F= bpdy llego
  // console.log(bodyRequest);
  next();
};

app.post(
  "/messages",
  getIdGreaterThan,
  validateBodyRequest,
  function (request, response) {
    if (bodyRequestexists) {
      console.log(request.body);
      const newMessage = {
        id: idGreat.id + 1,
        ...request.body,
      };
      messages.push(newMessage);
      // response.status(301).redirect("/");
      response.status(201).json(newMessage);
    } else {
      // Aspectos de request inválidos.Envio post sin cuerpo
      response.status(400).json(httpMsgError("Bad request"));
    }
  }
);

/*****    PUT    http://localhost:3001/messages/1              *****/
const validateMessageById = (id) => {
  const messageUpdateRef = messages.find((msg) => msg.id.toString() === id);
  if (messageUpdateRef === undefined) {
    return [false, null];
  } else {
    return [true, messageUpdateRef];
  }
};

app.put("/messages/:id", validateBodyRequest, (request, response) => {
  const idMessage = request.params.id;
  const bodyRequest = request.body;

  const refToMessage = validateMessageById(idMessage);

  if (refToMessage[0] === true && bodyRequestexists === true) {
    refToMessage[1].from = bodyRequest.from;
    refToMessage[1].text = bodyRequest.text;
    response.status(201).json(refToMessage[1]);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    DELETE    http://localhost:3001/messages/5              *****/
app.delete("/messages/:id", (request, response) => {
  const idMessage = request.params.id;
  const refToMessage = validateMessageById(idMessage);
  if (refToMessage[0]) {
    //splice borra por posición, el idice 2 es la posición 1. 2 borra posición 3
    messages.splice(idMessage - 1, 1);
    response.status(200).json(refToMessage[1]);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    GET QUERY    http://localhost:3001/messages/search?text=express              *****/
app.get("/messages/search", (request, response) => {
  const express = request.query.text;
  if (express.length!=0){
    const matchesWithExpress = messages.filter((exp) =>
      exp.text.includes(express)
    );
    response.status(200).json(matchesWithExpress)
  }else{
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    GET LATES    http://localhost:3001/messages/latest              *****/

//...END OF YOUR CODE

module.exports = app;
