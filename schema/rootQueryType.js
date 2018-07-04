const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLList } = graphql

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
  }),
})

module.exports = RootQuery
