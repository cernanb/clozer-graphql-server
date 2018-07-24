const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OpportunitySchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  product: { type: String },
  amount: { type: Number },
  won: { type: Boolean, default: false },
})

mongoose.model('opportunity', OpportunitySchema)
