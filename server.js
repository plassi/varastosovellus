const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const logger = require('express-log-mongo');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const url = config.get('mongoURI');
const databaseName = config.get('databaseName')
const db = url + "/" + databaseName

// Logger Config
logger.token('body', (req) => {
  return req.body;
})

app.use(logger(':date :method :url :status :remote-addr :response-time :http-version :remote-user :res[content-length] :referrer :user-agent :body', {
  url: url,
  db: databaseName,
  collection: 'logs'
}));

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/tarvikkeet', require('./routes/api/tarvikkeet'))
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
