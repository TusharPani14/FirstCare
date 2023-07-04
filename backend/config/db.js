const mongoose = require("mongoose");

const connectDB = async (connections) => {
  try {
    for (const { name, uri } of connections) {
      const connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connection.on("connected", () => {
        console.log(`MongoDB Connected: ${name} - ${connection.host}`.cyan.underline);
      });

      connection.on("error", (error) => {
        console.error(`Error connecting to MongoDB (${name}): ${error.message}`.red.bold);
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
