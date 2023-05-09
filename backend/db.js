const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
  mongoose.connect(
    mongoURI,
    await console.log("Connected to MongoDB successfully")
  );
};

module.exports = connectToMongo;
