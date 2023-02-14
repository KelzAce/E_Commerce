const mongoose = require("mongoose");
const { logger } = require("./logging/logger");

module.exports = (URI) => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connection to Database successful");
      logger.info("Connection to Database successful");
    })
    .catch((err) => {
      console.log("Connection to MongoDB failed", err.message);
      logger.error("Connection to MongoDB failed", err.message);
    });
};
