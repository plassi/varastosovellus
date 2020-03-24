const config = require('config')
const cors = require('cors')
const express = require('express')
require('express-async-errors')
const app = express()
const path = require('path')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

app.use(cors())

// Serve static assets if in production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'local-build') {
  // Set static folder
  console.log(process.env.NODE_ENV)
  
  app.use(express.static('client/build'))
}
// Connect to Mongo
logger.info('connecting to', config.get('mongoURI'))
mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Bodyparser Middleware
app.use(express.json())

// express-log-mongo Config
const mLogger = require('express-log-mongo')
mLogger.token('body', (request) => {
  return request.body;
})

// express-log-mongo
app.use(mLogger(':date :method :url :status :remote-addr :response-time :http-version :remote-user :res[content-length] :referrer :user-agent :body', {
  url: config.get('mongoURI'),
  db: config.get('databaseName'),
  collection: 'logs'
}))

// Use Routes
app.use('/api/tarvikkeet', require('./routes/api/tarvikkeet'))
app.use('/api/ostoslistat', require('./routes/api/ostoslistat'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join('./client/build/')});
});



// 
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app