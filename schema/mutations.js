const graphql = require('graphql')
const clientType = require('./clientType')
const mongoose = require('mongoose')
const Client = mongoose.model('client')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
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
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Client.remove({ _id: id })
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return Client.findByIdAndUpdate(args.id, { $set: args })
      },
    },
  },
})

module.exports = mutation
