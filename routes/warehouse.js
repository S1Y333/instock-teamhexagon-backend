const express = require("express");
const router = express.Router();
const controllersWarehouse = require("../controllers/controllers-Warehouses.js");

router.get("/", controllersWarehouse.getallWarehouses);
router.get("/:id", controllersWarehouse.getWarehouseById);
router.get("/:id/inventories", controllersWarehouse.getWarehouseInventories);
router.post("/", controllersWarehouse.createNewWarehouse);


module.exports = router;
