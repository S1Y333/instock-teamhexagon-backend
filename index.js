require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const warehouseRouter = require("./routes/warehouse");
const inventoryRouter = require("./routes/inventory");
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({ origin: CLIENT_URL }));

app.get("/", (_req, res) => {
  res.send("Welcome to my instock backend!");
});

app.use(express.json());

app.use(express.static("public"));

app.use("/warehouse", warehouseRouter);
app.use("/api/warehouses", warehouseRouter);
// app.use("/inventory", inventoryRouter);

//middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
