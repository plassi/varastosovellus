const router = require('express').Router()
const Tarvike = require('../../models/Tarvike')
const Ostoslista = require('../../models/Ostoslista')
const User = require('../../models/User')

router.post('/reset', async (request, response) => {
  await Tarvike.deleteMany({})
  await Ostoslista.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/lisaa-tarvikkeet', async (request, response) => {
  await Tarvike.create(request.body)
  response.status(200).end()
})

module.exports = router