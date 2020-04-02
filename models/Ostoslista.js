const mongoose = require('mongoose')

const tarvikkeetSchema = new mongoose.Schema({
  maara: Number,
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tarvike'
  },
})

const ostoslistaSchema = mongoose.Schema({
  nimi: {
    type: String,
    default: 'nimeton'
  },
  tarvikkeet: [ tarvikkeetSchema ]
})


ostoslistaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

tarvikkeetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Ostoslista', ostoslistaSchema)