const knex = require("knex")(require("../knexfile"));
const helper = require("../utils/helpers");

function buildInventoryQuery(modifier) {
  const query = knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    );

  if (modifier) {
    modifier(query);
  }

  return query;
}

exports.getAllInventoryItems = function (req, res) {
  buildInventoryQuery()
    .then((inventories) => {
      // console.log("Fetched inventories:", inventories);
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

  buildInventoryQuery((query) =>
    query.where("inventories.id", inventoryId).first()
  )
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

exports.createInventoryItem = async function (req, res) {
  // console.log(req.body);
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).json({
      message: "Please provide all the info for the inventory in the request",
    });
  }

  //check warehouse id exist
  const warehouseRow = await knex("inventories").where({
    id: req.body.warehouse_id,
  });

  if (warehouseRow === 0) {
    return res
      .status(404)
      .json({ message: `Warehouse with ID ${id} not found` });
  }

  //if the quantity is not a number
  const quantity = req.body.quantity;
  if (!helper.isNumber(quantity)) {
    return res.status(404).json({ message: `Quantity is not a number` });
  }

  try {
    const result = await knex("inventories").insert(req.body);

    const newInventoryId = result[0];
    const createdInventory = await knex("inventories").where({
      id: newInventoryId,
    });

    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory: ${error}`,
    });
  }
}

exports.deleteInventoryItem = async function (req, res) {
  try {
    const { id } = req.params;

    const inventoriesToDelete = await knex("inventories").where({ id }).delete();

    if (inventoriesToDelete === 0) {
      return res
        .status(404)
        .json({ message: `inventory with ID ${id} not found` });
    }
    

    // No Content response
    res.sendStatus(204);
  } catch (error) {
       res.status(500).json({
         message: `Unable to delete inventory: ${error}`,
       });
  }
}


 
