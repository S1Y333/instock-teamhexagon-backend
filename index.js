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

app.use(express.static('public'));

//middleware
app.use((req, res, next) => {
  if (req.query.api_key !== "helloworld") {
    return res
      .status(401)
      .send("Please provide an api_key as a query parameter");
  }

  next();
});

app.use(express.json());

app.use("/warehouse", warehouseRouter);
app.use("/inventory", inventoryRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
