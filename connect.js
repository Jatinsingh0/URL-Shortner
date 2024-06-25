const mongoose = require("mongoose");

const connectMongodb = async(url) => {
  return await mongoose.connect(url)
    .then(() => console.log("Mongodb connected"))
    .catch((error) => console.log(error, "Mongodb connection failed."));
};

module.exports = {
  connectMongodb,
};
