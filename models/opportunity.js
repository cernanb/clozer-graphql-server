const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OpportunitySchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
  },
  product: { type: String },
  amount: { type: Number },
  won: { type: Boolean, default: false },
})

mongoose.model('opportunity', OpportunitySchema)
