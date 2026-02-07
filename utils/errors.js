// keep the variables storing the error codes in a speaprate .js
// check name error with console.log(err.name)
const SOME_ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const SOME_ERROR_MESSAGES = {
  INVALID_DATA: "Invalid data provided",
  INVALID_ID: "Invalid ID format",
  USER_NOT_FOUND: "User not found",
  ITEM_NOT_FOUND: "Clothing items not found",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  SERVER_ERROR: "An error has occurred on the server",
};

module.exports = {
  SOME_ERROR_CODES,
  SOME_ERROR_MESSAGES,
};

// const createUser = (req, res) => {
//   User.create(...)
//   .then(...)
//   .catch((err) => {
//     console.error(err);
//     if (err.name ==='SOME_ERROR_CODE'){
//       return res.status(SOME_ERROR_CODE).send({message: "Approproiate error message"})
//   } else {

//   }
// );
