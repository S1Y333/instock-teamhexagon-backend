const express = require("express");
const router = express.Router();
const controllersWarehouse = require("../controllers/controllers-Warehouses.js");

router.get("/", controllersWarehouse.getallWarehouses);
console.log();
router.get("/:id", controllersWarehouse.getWarehouseById);

router.post("/", controllersWarehouse.createNewWarehouse);


module.exports = router;
