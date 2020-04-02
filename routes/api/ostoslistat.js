const express = require('express')
const router = express.Router()
const auth = require('../../utils/auth')

// Ostoslista Model
const Ostoslista = require('../../models/Ostoslista')

// @route   GET api/ostoslistat
// @desc    Get All Ostoslistat
// @access  Private
router.get('/', auth, async (req, res) => {
  const ostoslistat = await Ostoslista.find()
  res.json(ostoslistat.map(ostoslista => ostoslista.toJSON()))
})

// @route   POST api/ostoslistat
// @desc    Create An Ostoslista
// @access  Private
router.post('/', auth, async (req, res) => {
  const newOstoslista = new Ostoslista({
    nimi: req.body.nimi
  })

  await newOstoslista.save()
  res.json(newOstoslista)
})

// @route   PUT api/ostoslistat
// @desc    Update An Item
// @access  Private
router.put('/:id', auth, async (req, res) => {

  const ostoslista = {
    ...req.body
  }

  const updatedOstoslista = await Ostoslista.findByIdAndUpdate(req.params.id, ostoslista, { new: true })

  res.json(updatedOstoslista.toJSON())
})

// @route   DELETE api/ostoslistat/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, async (req, res) => {

  await Ostoslista.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = router
