const knex = require("knex")(require("../knexfile"));

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
  if (!req.body.warehouse_name || !req.body.address
    || !req.body.city || !req.body.country
    || !req.body.contact_name || !req.body.contact_position
    || !req.body.contact_phone || !req.body.contact_email) {
    return res.status(400).json({
      message: "Please provide all the info for the warehouse in the request",
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
 
}
