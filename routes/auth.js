const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const authenticate = require('../middleware/auth');
const userService = require('../services/user');

const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await userService.findOneById(req.user.id);
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route POST api/auth
// @desc Auth user and get token
// @access Public
router.post(
  '/',
  [
    body('email', 'Please include a valid email.').isEmail(),
    body('password', 'Please enter a password.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await userService.findOneByEmailForAuthentication(email);

      if (!user) {
        return res.status(400).json({ msg: 'Inavlid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
