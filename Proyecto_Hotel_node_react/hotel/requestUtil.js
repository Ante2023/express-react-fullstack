let _ = require("lodash");

const bodyRequestexists = (req) => {
  return (
    !_.isEmpty(req.body.title) &&
    !_.isEmpty(req.body.firstName) &&
    !_.isEmpty(req.body.surname) &&
    !_.isEmpty(req.body.email) &&
    !_.isEmpty(req.body.roomId.toString()) &&
    !_.isEmpty(req.body.checkInDate) &&
    !_.isEmpty(req.body.checkOutDate)
  );

  // console.log(!_.isEmpty(req.body.title))
  // console.log(!_.isEmpty(req.body.firstName))
  // console.log(!_.isEmpty(req.body.surname))
  // console.log(!_.isEmpty(req.body.email))
  // console.log(!_.isEmpty(req.body.roomId.toString()))
  // console.log(!_.isEmpty(req.body.checkInDate))
  // console.log(!_.isEmpty(req.body.checkOutDate))
};

const validateMessageById = (id,bookings) => {
  console.log("DDDDDDDDD");
  const messageUpdateRef = bookings.find((msg) => msg.id.toString() === id);
  if (messageUpdateRef === undefined) {
    return [false, null];
  } else {
    return [true, messageUpdateRef];
  }
};

module.exports = { validateMessageById, bodyRequestexists};
