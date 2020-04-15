const express = require('express')
const router = express.Router()
const auth = require('../../utils/auth')

// Tarvike Model
const Tarvike = require('../../models/Tarvike')

// @route   GET api/items
// @desc    Get All Items
// @access  Private
router.get('/', auth, async (req, res) => {
  const tarvikkeet = await Tarvike.find()
  res.json(tarvikkeet)
})

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
    kuva: req.body.kuva,
    hinta: req.body.hinta,
    hankintapaikka: req.body.hankintapaikka,
  })

  await newTarvike.save()
  res.json(newTarvike)
})

// @route   PUT api/items
// @desc    Update An Item
// @access  Private
router.put('/:id', auth, async (req, res) => {

  const tarvike = {
    ...req.body
  }

  const updatedTarvike = await Tarvike.findByIdAndUpdate(req.params.id, tarvike, { new: true })

  res.json(updatedTarvike.toJSON())
})

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, async (req, res) => {

  await Tarvike.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = router
