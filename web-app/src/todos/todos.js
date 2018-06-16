import React from 'react'
import { Query } from "react-apollo"
import { todos } from './gql'

export default () => (
  <Query query={todos}>
    {
      ({ loading, error, data }) => {
        if (loading)
          return <p>Loading...</p>;
        if (error)
          return <p>{error.message}</p>;

        return data.todos.map(({ id, title, completed }) => (
          <ul key={id}>
            <li>{`${title}: ${completed}`}</li>
          </ul>
        ));
      }
    }
  </Query>
)