import React from 'react'
import { Query } from 'react-apollo'
import { todos } from './gql'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import './Todos.css'

export default () => (
  <Query query={todos}>
    {
      ({ loading, error, data }) => {
        if (loading)
          return <p>Loading...</p>;
        if (error)
          return <p>{error.message}</p>;

        return (
          <Paper className="todos scroll">
            <List>
              {data.todos.map(({ id, title, completed }) => (
                <ListItem className="todo" key={id} role={undefined} dense button>
                  <Checkbox checked={completed} tabIndex={-1} disableRipple />
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )
      }
    }
  </Query>
)