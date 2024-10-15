const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI);
    console.log("MongoDB Connected ^_^");
  } catch (err) {
    console.log("Connection Failed To MongoDB! \n", error);
  }
};

module.exports = connectToDB;
