const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  avainsanat: [String],
  kuva: String
});

module.exports = Tarvike = mongoose.model('Tarvike', TarvikeSchema);
