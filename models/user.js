const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const { ERROR_MESSAGES } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value, {
          require_ltd: true,
          require_protocol: true,
        });
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    return Promise.reject(
      new Error(ERROR_MESSAGES.UNAUTHORIZED_EMAIL_PASSWORD)
    );
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return Promise.reject(
      new Error(ERROR_MESSAGES.UNAUTHORIZED_EMAIL_PASSWORD)
    );
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
