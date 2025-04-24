const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anshikagoel1701:VDBZf8ESHSkHVq9r@namastenode.fdskjzc.mongodb.net/EverAfter"
  );
};

module.exports = connectDB;
