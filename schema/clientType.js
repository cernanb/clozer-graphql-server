const mongoose = require('mongoose')
const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const OpportunityType = require('./opportunityType')

const Client = mongoose.model('client')

const ClientType = new GraphQLObjectType({
  name: 'ClientType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    address: { type: GraphQLString },
    opportunities: {
      type: new GraphQLList(OpportunityType),
      resolve(parentValue) {
        return Client.findOpportunities(parentValue.id)
      },
    },
  }),
})

module.exports = ClientType
