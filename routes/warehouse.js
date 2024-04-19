const express = require("express");
const router = express.Router();
const controllersWarehouse = require("../controllers/controllers-Warehouses.js");

router.get("/", controllersWarehouse.getallWarehouses);
router.get("/:id", controllersWarehouse.getWarehouseById);
router.get("/:id/inventories", controllersWarehouse.getWarehouseInventories);
router.post("/", controllersWarehouse.createNewWarehouse);
router.delete("/:id", controllersWarehouse.deleteWarehouse);
router.put("/:id", controllersWarehouse.editWarehouse);

module.exports = router;
