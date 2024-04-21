const knex = require("knex")(require("../knexfile"));
const helper = require("../utils/helpers");

exports.getallWarehouses = function (req, res) {
  const columnName = req.query.sort_by;
  const orderMethod = req.query.order_by || "asc";

  if (columnName) {
    knex("warehouses")
      .select("*")
      .orderBy(columnName, orderMethod)
      .then((warehouses) => res.json(warehouses))
      .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    knex("warehouses")
      .select("*")
      .then((warehouses) => res.json(warehouses))
      .catch((err) => res.status(500).json({ error: err.message }));
  }
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
  console.log(req.body);
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

exports.deleteWarehouse = async function (req, res) {
  try {
    const { id } = req.params;

    //find records
    const records = await knex("warehouses")
      .join("inventories", "warehouses.id", "inventories.warehouse_id")
      .select("inventories.id")
      .where("warehouses.id", id);

    //delete inventories first
    const inventoriesToDelete = records.map((record) =>
      knex("inventories").where({ warehouse_id: record.id }).delete()
    );

    if (inventoriesToDelete === 0) {
      return res
        .status(404)
        .json({ message: `inventory with warehouse ID ${id} not found` });
    }

    //delete warehouse
    const warehouseRowDeleted = await knex("warehouses").where({ id }).delete();

    if (warehouseRowDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
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
exports.editWarehouse = async function (req, res) {
  const { id } = req.params;
  
  const warehouseExists = knex("warehouses").where({ id }).first();
  
   if (!warehouseExists) {
     return res.status(400).json({
       message: "warehouse_id value does not exist in the warehouses table.",
     });
   }
    
 
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
    const result = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: `Unable to edit a warehouse: ${error}`,
    });
  }
};
