const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  opportunities: [{ type: Schema.Types.ObjectId, ref: 'opportunity' }],
})

ClientSchema.statics.addOpp = function(id, product, amount) {
  const Opp = mongoose.model('opportunity')

  return this.findById(id).then(client => {
    const opp = new Opp({ product, amount, won: false, client: client._id })
    client.opportunities.push(opp)
    return Promise.all([opp.save(), client.save()]).then(([opportunity, client]) => client)
  })
}

ClientSchema.statics.findOpportunities = function(id) {
  return this.findById(id)
    .populate('opportunities')
    .then(client => {
      return client.opportunities
    })
}

mongoose.model('client', ClientSchema)
