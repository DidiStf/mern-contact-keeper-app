const User = require('../models/User');

exports.findOneById = (id) => User.findById(id).select('-password');

exports.findOneByEmail = (email) => User.findOne({ email }).select('-password');

exports.findOneByEmailForAuthentication = (email) => User.findOne({ email });

exports.saveUser = (userData) => User.create(userData);
