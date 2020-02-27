const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { kayttajatunnus, salasana, rooli } = req.body;

  // Simple validation
  if(!kayttajatunnus || !salasana) {
    return res.status(400).json({ msg: 'Täytä kaikki kentät' });
  }

  // Check for existing user
  User.findOne({ kayttajatunnus })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'Käyttäjä on jo olemassa' });

      const newUser = new User({
        kayttajatunnus,
        salasana,
        rooli
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.salasana, salt, (err, hash) => {
          if(err) throw err;
          newUser.salasana = hash;
          newUser.save()
            .then(user => {
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
                      kayttajatunnus: user.kayttajatunnus,
                      rooli: user.rooli
                    }
                  });
                }
              )
            });
        })
      })
    })
});

module.exports = router;
