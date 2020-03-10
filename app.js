const config = require('config')
const express = require('express')
require('express-async-errors')
const app = express()
const path = require('path')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// express-log-mongo
const mLogger = require('express-log-mongo')

// express-log-mongo Config
mLogger.token('body', (request) => {
  return request.body;
})

app.use(mLogger(':date :method :url :status :remote-addr :response-time :http-version :remote-user :res[content-length] :referrer :user-agent :body', {
  url: config.get('mongoURI'),
  db: config.get('databaseName'),
  collection: 'logs'
}))

logger.info('connecting to', config.get('mongoURI'))

// Connect to Mongo
mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Bodyparser Middleware
app.use(express.json())

// Log requests to console
app.use(middleware.requestLogger)

// Use Routes
app.use('/api/tarvikkeet', require('./routes/api/tarvikkeet'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app
