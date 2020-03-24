const mongoose = require('mongoose')

const ostoslistaSchema = mongoose.Schema({
  nimi: {
    type: String,
    default: 'nimeton'
  },
  tarvikkeet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tarvike'
    }
  ],
})

ostoslistaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Ostoslista = mongoose.model('Ostoslista', ostoslistaSchema)

module.exports = Ostoslista