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
