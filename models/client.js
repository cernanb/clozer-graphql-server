const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
})

mongoose.model('client', ClientSchema)
