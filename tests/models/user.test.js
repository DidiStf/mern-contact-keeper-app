const mongoose = require('mongoose');

const { connectDB } = require('../../config/db');
const User = require('../../models/User');
const { setupDB } = require('../../utils/setupTestDB');

// Setup a test database
beforeAll(async () => await connectDB());
setupDB();

const userData = {
  name: 'newUser',
  email: 'newuser@email.com',
  password: '123456789',
};

describe('User Model Test', () => {
  it('Create and save user successfully', async () => {
    const savedUser = await User.create(userData);
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.name).toBe(userData.name);
  });

  it('Asure that we are not able to add in any field that is not defined in the user schema', async () => {
    const userWithInvalidField = { ...userData, nickname: 'inavlidField' };
    const savedUserWithInvalidField = await User.create(userWithInvalidField);
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  it('Asure that we are not able to create a user without required field name', async () => {
    const { name, ...user } = userData;
    let error = null;
    try {
      const savedUserWithMissingField = await User.create(user);
      error = savedUserWithMissingField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  });

  it('Asure that we are not able to create a user without required field email', async () => {
    const { email, ...user } = userData;
    let error = null;
    try {
      const savedUserWithMissingField = await User.create(user);
      error = savedUserWithMissingField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.email).toBeDefined();
  });

  it('Asure that we are not able to create a user without required field password', async () => {
    const { password, ...user } = userData;
    let error = null;
    try {
      const savedUserWithMissingField = await User.create(user);
      error = savedUserWithMissingField;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.password).toBeDefined();
  });
});
