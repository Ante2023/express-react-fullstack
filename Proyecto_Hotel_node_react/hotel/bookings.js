const express = require("express");
const fs = require("fs");

const router = express.Router();
const { authenticateMddWare } = require("./middleware/authenticate");
const bookings = require("./bookings.json");
const { bodyRequestexists, validateMessageById } = require("./requestUtil");
const createJWT = require("./utils/createJWT");

// http://localhost:5000/bookings/
router.get("/", authenticateMddWare, (req, res) => {
  console.log("user", req.user); //user { idUser: 0 }
  res.status(200).json(bookings);
});

// http://localhost:5000/bookings/find-id?id=3
router.get("/id", authenticateMddWare, (request, response) => {
  const query = request.query.id;
  // console.log(typeof query); //string
  if (query.length > 0) {
    const matchesWithQuery = bookings.filter(
      (exp) => exp.id === +query
      // console.log(typeof exp.id) //number
    );
    if (matchesWithQuery.length > 0) {
      response.status(200).json(matchesWithQuery);
    } else {
      response.status(404).json(httpMsgError("Not Found"));
    }
    // console.log(matchesWithQuery);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

// http://localhost:5000/bookings/search?term=express
router.get("/search", authenticateMddWare, (request, response) => {
  const express = request.query.term;
  if (express.length != 0) {
    const matchesWithExpress = bookings.filter((exp) =>
      exp.firstName.includes(express)
    );
    response.status(200).json(matchesWithExpress);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

// http://localhost:5000/bookings
router.post("/", authenticateMddWare, function (request, response) {
  console.log("POST");
  const flag = bodyRequestexists(request);
  if (flag) {
    const newBooking = {
      id: bookings.length + 1,
      ...request.body,
    };
    console.log(newBooking);
    bookings.push(newBooking);

    fs.writeFileSync("./bookings.json", JSON.stringify(bookings));

    response.status(201).json(newBooking);
  } else {
    // Aspectos de request inválidos.Envio post sin cuerpo
    response.status(400).json(httpMsgError("Bad request"));
  }
  response.send("DDDD");
});

/*****    DELETE    http://localhost:5000/bookings/6              *****/
router.delete("/:id", authenticateMddWare, (request, response) => {
  const idBooking = request.params.id;
  const refToBooking = validateMessageById(idBooking, bookings);
  console.log(refToBooking);
  if (refToBooking[0]) {
    //splice borra por posición, el idice 2 es la posición 1. 2 borra posición 3
    bookings.splice(idBooking - 1, 1);
    response.status(200).json(refToBooking[1]);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

/*****    GET QUERY    http://localhost:5000/bookings/search?date=2017-12-25              *****/
router.get("/searchData", authenticateMddWare, (request, response) => {
  const date = request.query.date;

  console.log(date);
  if (date.length != 0) {
    const matchesWithDate = bookings.filter((exp) =>
      exp.checkInDate.includes(date)
    );
    response.status(200).json(matchesWithDate);
  } else {
    //Recurso no existe,idMensaje no existe en el array
    response.status(404).json(httpMsgError("Not Found"));
  }
});

module.exports = router;
