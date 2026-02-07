const ClothingItem = require("../models/clothingItem");
const { findByIdAndUpdate } = require("../models/user");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

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
// middleware add a user object to each request. take the user id from it inside the card crdation controller
module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
};

// module.exports.disLikeItem = (req, res) => {
//   ClothingItem.findByIdAndUpdate(
//     req.params.itemId,
//     { $pull: { likes: req.user._id } },
//     { new: true }
//   );
// };
