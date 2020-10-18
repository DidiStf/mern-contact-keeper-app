const { connectDB } = require('../../config/db');
const User = require('../../models/User');
const userService = require('../../services/user');
const { setupDB } = require('../../utils/setupTestDB');

// Setup a test database
beforeAll(async () => await connectDB());
setupDB();

const newUser = {
  email: 'newuser@email.com',
  name: 'NewUser',
  password: '123456789',
};

const testUser = {
  email: 'testuser1@email.com',
  name: 'TestUser1',
  password: '123456',
};

describe('User Service Test', () => {
  it('Create and save user successfully', async () => {
    const savedUser = await userService.saveUser(newUser);
    expect(savedUser._id).toBeDefined();
    expect(savedUser.password).toBeDefined();
    expect(savedUser.email).toBe(newUser.email);
    expect(savedUser.name).toBe(newUser.name);
  });

  it('Find saved user by id', async () => {
    const user = await User.findOne({ email: testUser.email });
    const foundUser = await userService.findOneById(user._id);
    expect(foundUser._id).toBeDefined();
    expect(foundUser.password).toBeUndefined();
    expect(foundUser.email).toBe(user.email);
    expect(foundUser.name).toBe(user.name);
  });

  it('Find one by email', async () => {
    const user = await userService.findOneByEmail(testUser.email);
    expect(user._id).toBeDefined();
    expect(user.password).toBeUndefined();
    expect(user.name).toBe(testUser.name);
    expect(user.email).toBe(testUser.email);
  });

  it('Find one by email for authentication', async () => {
    const user = await userService.findOneByEmailForAuthentication(
      testUser.email
    );
    expect(user._id).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.name).toBe(testUser.name);
    expect(user.email).toBe(testUser.email);
  });
});
