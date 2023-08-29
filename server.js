const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const secretKey = 'your-secret-key'; // Update with your secret key

const users = [];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello, GraphQL!'
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signup: {
      type: UserType,
      description: 'User signup',
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        // Signup logic
      }
    },
    login: {
      type: GraphQLString,
      description: 'Login and get JWT token',
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        // Login logic
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const port = 5500; // Update with your desired port number
app.listen(port, () => console.log(`Server Running on port ${port}`));
