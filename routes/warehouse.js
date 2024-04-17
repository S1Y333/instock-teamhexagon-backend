const express = require("express");
const router = express.Router();
const controllersWarehouse = require("../controllers/controllers-Warehouses.js");

router.route("/").get(controllersWarehouse.getallWarehouses);
console.log();
router.get("/:id", controllersWarehouse.getWarehouseById);

module.exports = router;
