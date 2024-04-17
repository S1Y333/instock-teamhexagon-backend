const express = require("express");
const router = express.Router();

const controllersWarehouse = require("../controllers/controllers-Warehouses.js");

router.route("/").get(controllersWarehouse.getallWarehouses);

module.exports = router;
