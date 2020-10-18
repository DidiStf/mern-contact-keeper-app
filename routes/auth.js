const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const authenticate = require('../middleware/auth');
const userService = require('../services/user');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const user = await userService.findOneById(req.user.id);
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post(
  '/',
  [
    body('email', 'Missing a valid required property email').isEmail(),
    body('password', 'Missing a valid required property password')
      .not()
      .isEmpty(),
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
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      user.comparePassword(password, (_, match) => {
        if (!match) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

module.exports = router;
