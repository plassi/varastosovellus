const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const TarvikeSchema = new Schema({
  nimi: {
    type: String,
    required: true
  },
  kategoria: String,
  kuvaus: String,
  maara: {
    type: Number,
    required: true
  },
  maarayksikko: {
    type: String,
    required: true
  },
  sijainti: String,
  kuva: String,
  hinta: Number
})

TarvikeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Tarvike', TarvikeSchema)
