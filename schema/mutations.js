const graphql = require('graphql')
const clientType = require('./clientType')
const mongoose = require('mongoose')
const Client = mongoose.model('client')
const { GraphQLObjectType, GraphQLString } = graphql
const ClientType = require('./clientType')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return new Client(args).save()
      },
    },
  },
})

module.exports = mutation
