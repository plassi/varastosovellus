const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../utils/auth');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', async (req, res) => {
  const body = req.body;

  // Simple validation
  if (!body.kayttajatunnus || !body.salasana) {
    return res.status(400).json({ msg: 'Täytä kaikki kentät' });
  }

  // Check for existing user
  const user = await User.findOne({ kayttajatunnus: body.kayttajatunnus})
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.salasana, user.salasanaHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'väärä käyttäjätunnus tai salasana'
    })
  }

  const userForToken = {
    kayttajatunnus: user.kayttajatunnus,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.get('jwtSecret'))

  res
    .status(200)
    .send({ token, kayttajatunnus: user.kayttajatunnus })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .then(user => res.json(user));
});

module.exports = router;
