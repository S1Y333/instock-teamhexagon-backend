exports.getAllInventoryItems = function (req, res) {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select("inventories.*", "warehouses.warehouse_name")
    .then((inventories) => {
      console.log("Fetched inventories with warehouse names:", inventories);
      res.status(200).json(inventories);
    })
    .catch((err) => {
      console.error("Error fetching inventories with warehouse names:", err);
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
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .where("inventories.id", id)
    .first()
    .select("inventories.*", "warehouses.warehouse_name")
    .then((inventory) => {
      if (inventory) {
        console.log("Fetched inventory item with warehouse name:", inventory);
        res.status(200).json(inventory);
      } else {
        res.status(404).send("Inventory item not found");
      }
    })
    .catch((err) => {
      console.error("Error fetching inventory item with warehouse name:", err);
      res.status(500).send({ error: err.message });
    });
};
