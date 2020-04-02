const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  salasanaHash: {
    type: String,
    required: true
  },
  rooli: {
    type: String,
    required: true
  },
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // piilotetaan salasanaHash
    delete returnedObject.salasanaHash
  }
})

module.exports = mongoose.model('User', UserSchema)
