const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
require("dotenv").config();

// GraphQL schema
const schema = buildSchema(`
    type Account{
      username: String!
      email: String!
      password: String!
    }
    type Query {
        messages: String
    }
    type Mutation{
      login(email: String!,password: String!): String
    }
`);

const login = ({ email, password }) => {
  if (email === "admin" && password === "admin") {
    return "success login"
  }
  return "wrong password or email";
}
// Root resolver
const resolvers = {
  messages: () => 'Hello World!',
  login: login
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', expressGraphql({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));
app.listen(process.env.GRAPHQL_API_PORT, () => console.log(`Express GraphQL Server Now Running On http://${process.env.GRAPHQL_API_HOST}:${process.env.GRAPHQL_API_PORT}/graphql`));
