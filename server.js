const app = require('./app')
const http = require('http')
const config = require('config')
const logger = require('./utils/logger')

const server = http.createServer(app)
const port = process.env.PORT || config.get('port')

server.listen(port, () => {
  logger.info(`Server started on port ${port}`)
})