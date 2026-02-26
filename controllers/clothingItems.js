const ClothingItem = require("../models/clothingItem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      console.error(err);
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_DATA });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.deleteItem = (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  ClothingItem.findById(id)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== _id.toString()) {
        const error = new Error(ERROR_MESSAGES.FORBIDDEN);
        error.statusCode = ERROR_CODES.FORBIDDEN;
        throw error;
      }

      return ClothingItem.findByIdAndDelete(id);
    })
    .then((item) => res.send({ data: item }))
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
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }

      if (err.statusCode === ERROR_CODES.FORBIDDEN) {
        return res.status(ERROR_CODES.FORBIDDEN).send({
          message: ERROR_MESSAGES.FORBIDDEN,
        });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => {
      res.send({ data: item });
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
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = ERROR_CODES.NOT_FOUND;
      throw error;
    })
    .then((item) => {
      res.send({ data: item });
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
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      return res
        .status(ERROR_CODES.DEFAULT_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};
