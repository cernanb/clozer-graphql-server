const express = require('express')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./services/auth')
const MongoStore = require('connect-mongo')(session)
const schema = require('./schema')
const cors = require('cors')

const app = express()

var corsOptions = {
  origin: 'http://localhost:1234',
  credentials: true, // <-- REQUIRED backend setting
}

app.use(cors(corsOptions))
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
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true,
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

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
