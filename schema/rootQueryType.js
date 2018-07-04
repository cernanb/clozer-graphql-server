const graphql = require('graphql')

const { GraphQLObjectType, GraphQLList } = graphql
const ClientType = require('./clientType')

const clients = [{ id: 1, firstName: 'John', lastName: 'Crow', email: 'john@gmail.com', address: '123 Main St' }]

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return clients
      },
    },
  }),
})

module.exports = RootQuery
