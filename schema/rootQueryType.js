const graphql = require("graphql")
const mongoose = require("mongoose")
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql

const ClientType = require("./clientType")
const UserType = require("./userType")
const Client = mongoose.model("client")
const User = mongoose.model("user")

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args, req) {
        return User.findById(req.user.id)
          .populate("clients")
          .then(user => {
            return user.clients
          })
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Client.findById(id)
      }
    },
    currentUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user
      }
    }
  })
})

module.exports = RootQuery
