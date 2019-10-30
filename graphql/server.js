var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
require("dotenv").config();

// GraphQL schema
var schema = buildSchema(`
    type Query {
        messages: String
    }
`);
// Root resolver
var root = {
    messages: () => 'Hello Worsld!'
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(process.env.GRAPHQL_API_PORT, () => console.log(`sExpress GraphQL Server Now Running On http://${process.env.GRAPHQL_API_HOST}:${process.env.GRAPHQL_API_PORT}/graphql`));
