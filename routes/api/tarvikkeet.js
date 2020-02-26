const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Tarvike Model
const Tarvike = require('../../models/Tarvike');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Tarvike.find()
    // .sort({ date: -1 }) Palvelimelta haettavan listan järjestely
    .then(tarvikkeet => res.json(tarvikkeet));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
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

  console.log(newTarvike);
  

  newTarvike.save().then(tarvike => res.json(tarvike));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  console.log(req.params);
  
  Tarvike.findById(req.params.id)
    .then(tarvike => tarvike.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
