const express = require('express')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const schema = require('./schema')
const app = express()

const PORT = 4000

require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connection to MongoLab: ', error))

app.use(bodyParser.json())
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
