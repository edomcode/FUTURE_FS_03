require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  console.log('Testing Mongo connection...');
  console.log('URI host:', (process.env.MONGO_URI || '').replace(/:\/\/[^@]+@/, '://***:***@'));
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('CONNECTED. ReadyState:', mongoose.connection.readyState);
    const User = require('./models/User');
    const count = await User.countDocuments();
    console.log('User count:', count);
    await mongoose.disconnect();
    console.log('DONE');
    process.exit(0);
  } catch (e) {
    console.error('FAILED:', e.name, '-', e.message);
    process.exit(1);
  }
})();
