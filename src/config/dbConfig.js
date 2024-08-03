const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;
console.log(dbUrl);

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error Occured", err);
  }
};

module.exports = connectDB;
