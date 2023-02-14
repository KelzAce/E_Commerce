const CONFIG = require("./config/config");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const logger = require("./logging/logger");

// connect to db
require("./middleware/db")(CONFIG.MONGODB_URI);

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running");
  logger.info("Backend Server is running");
});
