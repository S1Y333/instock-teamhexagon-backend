const knex = require("knex")(require("../knexfile"));

exports.getAllInventoryItems = function (req, res) {
  console.log("Fetching all inventory items");
  knex("inventories")
    .select("*")
    .then((inventories) => {
      console.log("Fetched inventories:", inventories);
      res.status(200).json(inventories);
    })
    .catch((err) => {
      console.error("Error fetching inventories:", err);
      res.status(500).send({ error: err.message });
    });
};

exports.getInventoryItemById = function (req, res) {
  const { id } = req.params;
  const inventoryId = parseInt(id, 10);
  if (isNaN(inventoryId)) {
    return res.status(400).send("Invalid ID format");
  }
  knex("inventories")
    .where({ id: id })
    .first()
    .then((inventory) => {
      if (inventory) res.status(200).json(inventory);
      else res.status(404).send("Inventory item not found");
    })
    .catch((err) => res.status(500).send({ error: err.message }));
};
