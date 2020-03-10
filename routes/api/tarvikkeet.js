const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');

// Tarvike Model
const Tarvike = require('../../models/Tarvike');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', async (req, res) => {
  const tarvikkeet = await Tarvike.find()
  // .sort({ date: -1 }) Palvelimelta haettavan listan järjestely
  res.json(tarvikkeet)
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, async (req, res) => {
  const newTarvike = new Tarvike({
    nimi: req.body.nimi,
    kategoria: req.body.kategoria,
    kuvaus: req.body.kuvaus,
    maara: req.body.maara,
    maarayksikko: req.body.maarayksikko,
    sijainti: req.body.sijainti,
    avainsanat: req.body.avainsanat,
    kuva: req.body.kuva
  });

  await newTarvike.save()
  res.json(newTarvike)
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, async (req, res) => {

  const tarvike = await Tarvike.findById(req.params.id)
  await Tarvike.remove(tarvike)
});

module.exports = router;
