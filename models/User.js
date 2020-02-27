const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  nimi: {
    type: String
  },
  kayttajatunnus: {
    type: String,
    required: true,
    unique: true
  },
  salasana: {
    type: String,
    required: true
  },
  rooli: {
    type: String,
    required: true
  },
});

module.exports = User = mongoose.model('user', UserSchema);
