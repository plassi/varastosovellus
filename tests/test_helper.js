const Tarvike = require('../models/Tarvike')

const adminUser = {
  'kayttajatunnus': 'testi',
  'salasana': 'testi',
  'rooli': 'admin'
}

const initialTarvikkeet = [
  {
    nimi: 'Tarvike 1',
    kategoria: 'Tarvikkeen 1 kategoria',
    kuvaus: 'Tarvikkeen 1 kuvaus',
    maara: 10,
    maarayksikko: "kpl",
    sijainti: "A1",
    hinta: "10"
  },
  {
    nimi: 'Tarvike 2',
    kategoria: 'Tarvikkeen 2 kategoria',
    kuvaus: 'Tarvikkeen 2 kuvaus',
    maara: 20,
    maarayksikko: "ltr",
    sijainti: "B2",
    hinta: "20"
  },
]

const nonExistingTarvikeId = async () => {
  const tarvike = new Tarvike({ content: 'willremovethissoon'})
  await tarvike.save()
  await tarvike.remove()

  return tarvike._id.toString()
}

const tarvikkeetInDb = async () => {
  const tarvikkeet = await Tarvike.find({})
  return tarvikkeet.map(tarvike => tarvike.toJSON())
}

module.exports = {
  adminUser, initialTarvikkeet, nonExistingTarvikeId, tarvikkeetInDb
}