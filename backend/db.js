const mongoose = require('mongoose');

// const server = '127.0.0.1:27017'
// const database = 'Test'

const connectToMongo = async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/`);
  console.log('connected to mongo db Atlas');
};
module.exports = connectToMongo;
