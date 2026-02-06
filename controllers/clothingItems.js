const ClothingItem = require("../models/clothingItem");

module.exports.getItem = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) =>
      res.status(500).res.send({ message: "Requested resource not found" })
    );
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = "507f1f77bcf86cd799439011";
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.send({ data: item }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send({ data: item });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
