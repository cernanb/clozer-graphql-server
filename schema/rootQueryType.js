const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql

const ClientType = require('./clientType')
const Client = mongoose.model('client')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find({})
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Client.findById(id)
      },
    },
  }),
})

module.exports = RootQuery
