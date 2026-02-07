// keep the variables storing the error codes in a speaprate .js
// check name error with console.log(err.name)
const { SOME_ERROR_CODE } = require("../utils/errors");

const createUser = (req, res) => {
  User.create(...)
  .then(...)
  .catch((err) => {
    console.error(err);
    if (err.name ==='SOME_ERROR_CODE'){
      return res.status(SOME_ERROR_CODE).send({message: "Approproiate error message"})
  } else {

  }
);
