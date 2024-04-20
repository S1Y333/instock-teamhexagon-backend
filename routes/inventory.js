const express = require("express");
const router = express.Router();
const controllersInventory = require("../controllers/controllers-Inventory");

router.get("/", controllersInventory.getAllInventoryItems);

router.post("/", controllersInventory.createInventoryItem);
router.delete("/:id", controllersInventory.deleteInventoryItem);



module.exports = router;
