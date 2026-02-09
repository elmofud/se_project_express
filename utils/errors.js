const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  DEFAULT_ERROR: 500,
};

const ERROR_MESSAGES = {
  INVALID_DATA: "Invalid data provided",
  INVALID_ID: "Invalid ID format",

  USER_NOT_FOUND: "User not found",
  ITEM_NOT_FOUND: "Clothing items not found",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  SERVER_ERROR: "An error has occurred on the server",
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};
