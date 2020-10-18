const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    process.env.NODE_ENV !== 'test' &&
      console.log('MongoDB Connected...'.green);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;
