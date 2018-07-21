const mongoose = require('mongoose')
const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } = graphql

const Opportunity = mongoose.model('opportunity')

const OpportunityType = new GraphQLObjectType({
  name: 'OpportunityType',
  fields: () => ({
    id: { type: GraphQLID },
    product: { type: GraphQLString },
    amount: { type: GraphQLInt },
    won: { type: GraphQLBoolean },
    client: {
      type: require('./clientType'),
      resolve(parentValue) {
        return Opportunity.findById(parentValue)
          .populate('client')
          .then(opp => {
            console.log(opp)
            return opp.client
          })
      },
    },
  }),
})

module.exports = OpportunityType
