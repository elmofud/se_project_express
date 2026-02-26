const ERROR_CODES = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  DEFAULT_ERROR: 500,
  CONFLICT_DATA: 409,
  UNAUTHORIZED: 401,
};

const ERROR_MESSAGES = {
  INVALID_DATA: "Invalid data provided",
  INVALID_ID: "Invalid ID format",
  INVALID_TOKEN: "Invalid or expired token",

  USER_NOT_FOUND: "User not found",
  ITEM_NOT_FOUND: "Clothing item not found",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  SERVER_ERROR: "An error has occurred on the server",
  CONFLICTED_DATA: "A user with this email already exists",
  UNAUTHORIZED_EMAIL_PASSWORD: "Incorrect email or password",
  FORBIDDEN: "You are not authorized to delete this item",
  AUTHORIZATION_REQUIRED: "Authorization required",
  PASSWORD_REQUIRED_STRING: "Password is required and must be a string",
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};
