const mongoose = require('mongoose');

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_PATH, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB,
    });
    console.log('connected to mongo', process.env.MONGO_PATH);
  } catch (e) {
    console.error(e);
  }
};

module.exports = connectDB;
