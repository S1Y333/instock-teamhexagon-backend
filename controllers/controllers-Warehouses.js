const knex = require("knex")(require("../knexfile"));
const helper = require("../utils/helpers");

exports.getallWarehouses = function (req, res) {
  knex("warehouses")
    .select("*")
    .then((warehouses) => res.json(warehouses))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getWarehouseById = function (req, res) {
  const { id } = req.params;
  knex("warehouses")
    .where({ id })
    .first()
    .then((warehouse) => {
      if (warehouse) res.json(warehouse);
      else res.status(404).send("Warehouse not found");
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.createNewWarehouse = async function (req, res) {
  // console.log(req.body);
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res.status(400).json({
      message: "Please provide all the info for the warehouse in the request",
    });
  }

  // Email validation
  const email = req.body.contact_email;
  if (!helper.validateEmail(email)) {
    return res.status(400).json({
      message: "Please provide valid email address",
    });
  }

  //phone number validation
  const phoneNumber = req.body.contact_phone;
  if (!helper.validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({
      message: "Please provide valid phone number",
    });
  }

  try {
    const result = await knex("warehouses").insert(req.body);

    const newWarehouseId = result[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseId,
    });

    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouse: ${error}`,
    });
  }
};

exports.getWarehouseInventories = function (req, res) {
  const { id } = req.params;
  console.log("Warehouse ID requested:", id);

  knex("warehouses")
    .where({ id })
    .first()
    .then((warehouse) => {
      if (!warehouse) {
        console.log("No warehouse found for ID:", id);
        return res.status(404).send("Warehouse not found");
      }
      console.log("Warehouse found, fetching inventories...");
      knex("inventories")
        .where({ warehouse_id: id })
        .select("id", "item_name", "category", "status", "quantity")
        .then((inventories) => res.status(200).json(inventories))
        .catch((err) => {
          console.error("Error fetching inventories", err);
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.error("Error checking warehouse", err);
      res.status(500).json({ error: err.message });
    });
};
