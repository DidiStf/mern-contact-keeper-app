const mongoose = require('mongoose');

const Contact = require('../models/Contact');
const contacts = require('../seeds/contactSeeds');
const User = require('../models/User');
const users = require('../seeds/userSeeds');

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const dropAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // This error happens when you try to drop acollection that's already dropped. Happens infrequently.
      // Safe to ignore.
      if (error.message === 'ns not found') return;

      // This error happens when you use it.todo
      // Safe to ignore.
      if (error.message.includes('a background operation is currently running'))
        return;
    }
  }
};

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};

const seedDataBase = async () => {
  await User.create(users);
  const newUsers = await User.find();
  newUsers.forEach(async ({ _id }) => {
    const newContacts = contacts.map((contact) => ({
      user: _id,
      ...contact,
    }));
    await Contact.insertMany(newContacts);
  });
};

module.exports = {
  setupDB() {
    // Clean up test database before running tests
    beforeAll(async (done) => {
      await dropAllCollections();
      done();
    });

    // Seed the test database with users
    beforeEach(async (done) => {
      await seedDataBase();
      done();
    });

    // Clean up test database between each test
    afterEach(async (done) => {
      await removeAllCollections();
      done();
    });

    // Disconnect Mongoose (closing the DB connection allows Jest to exit successfully).
    afterAll(async (done) => {
      await dropAllCollections();
      await disconnectDB();
      done();
    });
  },
};
