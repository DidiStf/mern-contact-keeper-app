const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const userService = require('../services/user');

const router = express.Router();

router.post(
  '/',
  [
    body('name', 'Missing a valid required property name').not().isEmpty(),
    body('email', 'Missing a valid required property email').isEmail(),
    body(
      'password',
      'Missing a valid required property password of 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await userService.findOneByEmail(email);

      if (user) {
        return res.status(409).json({ message: 'User already exists' });
      }

      user = await userService.saveUser({ name, email, password });

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
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
