const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ID });
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!password || typeof password !== "string") {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.PASSWORD_REQUIRED_STRING });
  }
  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).send({ data: userObject });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      if (err.code === 11000) {
        return res
          .status(ERROR_CODES.CONFLICT_DATA)
          .send({ message: ERROR_MESSAGES.CONFLICTED_DATA });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.INVALID_DATA });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === ERROR_MESSAGES.UNAUTHORIZED_EMAIL_PASSWORD) {
        return res
          .status(ERROR_CODES.UNAUTHORIZED)
          .send({ message: ERROR_MESSAGES.UNAUTHORIZED_EMAIL_PASSWORD });
      }

      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      if (err.statusCode === ERROR_CODES.NOT_FOUND) {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};
