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
  from: "Aris",
  text: "La inteligencia consiste no sólo en el conocimiento, sino también en la destreza ...",
  date: new Date().toISOString(),
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
  // Si no son vacios los campos text y from, bodyRequestexists = V
  bodyRequestexists = !_.isEmpty(req.body.text) && !_.isEmpty(req.body.from);
  //&&  !_.isEmpty(req.body.date); // Esta línea por el put
  // V= body vacio, F= body llego
  // console.log(bodyRequest);

  // if (req.body.from === true && req.body.text === false) {
  //   bodyRequestexists = false;
  // }

  next();
};

app.post(
  "/messages",
  getIdGreaterThan,
  validateBodyRequest,
  function (request, response) {
    if (bodyRequestexists) {
      console.log(request.body);

      console.log(request.body);
      const newMessage = {
        id: idGreat.id + 1,
        ...request.body,
        // date: new Date().toISOString(),
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
    refToMessage[1].date = refToMessage[1].date;
    response.status(201).json(refToMessage[1]);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    GET QUERY    http://localhost:3001/messages/search?text=express              *****/
app.get("/messages/search", (request, response) => {
  const express = request.query.text;
  if (express.length != 0) {
    const matchesWithExpress = messages.filter((exp) =>
      exp.text.includes(express)
    );
    response.status(200).json(matchesWithExpress);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    GET LATES    http://localhost:3001/messages/latest              *****/

const shortById = () => {
  messages.sort((msg1, msg2) => {
    if (msg1.id == msg2.id) {
      return 0;
    }
    if (msg1.id > msg2.id) {
      return -1;
    }
    return 1;
  });
};

app.get("/messages/latest", validateBodyRequest, (request, response) => {
  // shortById(); // retornas mismo objeto ordenado (referencia a su memoria))
  if (!_.isEmpty(messages)) {
    //Si hay menos de 10 mensajes, los muestro todos. Copio messages a un nuevo arreglo que estarà ordenado
    if (messages.length <= 10) {
      const messagesSorted = _.sortBy(messages, "id").reverse(); // retorna nuevo objeto ordenado
      console.log([...messagesSorted]);
      response.status(200).json([...messagesSorted]);
      //Si hay más de 10 mensajes, muestro solo los 10 útimos. Copio messages a un nuevo arreglo que estarà ordenado
    } else {
      // shortById();
      response
        .status(200)
        .json(messages.slice(messages.length - 10, messages.length).reverse());
    }
  } else {
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    GET FINDID    http://localhost:3001/messages/find-id?id=3              *****/

app.get("/messages/find-id", (request, response) => {
  const query = request.query.id;
  // console.log(typeof query); //string
  if (query.length >0) {
    const matchesWithQuery = messages.filter((exp) =>exp.id === +query
      // console.log(typeof exp.id) //number
    );
    if(matchesWithQuery.length >0 ){
      response.status(200).json(matchesWithQuery);
    }else{
      response.status(404).json(httpMsgError("Not Found"));
    }
    // console.log(matchesWithQuery);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});
//...END OF YOUR CODE

module.exports = app;
