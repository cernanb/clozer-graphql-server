const graphql = require('graphql')
const UserType = require('./userType')
const mongoose = require('mongoose')
const Client = mongoose.model('client')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql
const ClientType = require('./clientType')

const AuthService = require('../services/auth')

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
    addOppToClient: {
      type: ClientType,
      args: {
        product: { type: GraphQLString },
        amount: { type: GraphQLInt },
        clientId: { type: GraphQLID },
      },
      resolve(parentValue, { product, clientId, amount }) {
        return Client.addOpp(clientId, product, amount)
      },
    },
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, { email, password, firstName, lastName }, req) {
        return AuthService.signup({ email, password, firstName, lastName, req })
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req
        req.logout()
        return user
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req })
      },
    },
  },
})

module.exports = mutation
