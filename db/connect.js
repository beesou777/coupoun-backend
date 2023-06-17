const mongoose = require('mongoose');

const connectdb = (uri) => {
  console.log('connected to mongodb');
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectdb;
