const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { kayttajatunnus, salasana } = req.body;

  // Simple validation
  if(!kayttajatunnus || !salasana) {
    return res.status(400).json({ msg: 'Täytä kaikki kentät' });
  }

  // Check for existing user
  User.findOne({ kayttajatunnus })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'Käyttäjää ei ole olemassa' });

      // Validate salasana
      bcrypt.compare(salasana, user.salasana)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Väärä käyttäjä tai salasana' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  kayttajatunnus: user.kayttajatunnus
                }
              });
            }
          )
        })
    })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-salasana')
    .then(user => res.json(user));
});

module.exports = router;
