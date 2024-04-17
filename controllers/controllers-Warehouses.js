const knex = require("knex")(require("../knexfile"));

exports.getallWarehouses = (req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((error) => {
      res.status(400).send(`Error retrieving warehouse data ${error}`);
    });
};
