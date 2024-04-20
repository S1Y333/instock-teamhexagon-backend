const express = require("express");
const router = express.Router();
const controllersInventory = require("../controllers/controllers-Inventory");
const { updateInventoryItem } = require("../controllers/controllers-Inventory");

router.get("/", controllersInventory.getAllInventoryItems);
router.get("/:id", controllersInventory.getInventoryItemById);
router.post("/", controllersInventory.createInventoryItem);
router.put("/:id", controllersInventory.updateInventoryItem);
router.delete("/:id", controllersInventory.deleteInventoryItem);

module.exports = router;
