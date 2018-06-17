import React from 'react'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import Todos from "./todos/Todos"
import './App.css'
import Typography from '@material-ui/core/Typography'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <Typography variant="display1" gutterBottom>
        <i className="header material-icons">assignment</i>
        First GraphQL-Apollo App
      </Typography>
      <Todos />
    </div>
  </ApolloProvider>
);

export default App;
