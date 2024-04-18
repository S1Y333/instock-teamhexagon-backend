const express = require("express");
const router = express.Router();
const controllersInventory = require("../controllers/controllers-Inventory");

router.get("/", controllersInventory.getAllInventoryItems);

router.get("/:id", controllersInventory.getInventoryItemById);

module.exports = router;
