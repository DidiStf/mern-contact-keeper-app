const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.findOneById = (id) => User.findById(id).select('-password');

exports.findOneByEmail = (email) => User.findOne({ email }).select('-password');

exports.findOneByEmailForAuthentication = (email) => User.findOne({ email });

exports.saveUser = async (userData) => {
  let user = new User(userData);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(userData.password, salt);
  await user.save();

  return user;
};
