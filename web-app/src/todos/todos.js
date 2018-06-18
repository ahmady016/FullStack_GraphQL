import React from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  TODOS,
  SET_COMPLETED
} from './gql'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import LinearProgress  from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import './Todos.css'

export default () => (
  <Query query={TODOS}>
    {
      ({ loading, error, data }) => {
        if (loading)
          return (
            <Paper className="todos scroll">
              <LinearProgress />
            </Paper>
          )
        if (error)
          return (
            <Paper className="todos scroll">
              <Typography variant="title">
                <i className="header material-icons">highlight_off</i>
                {error.message}
              </Typography>
            </Paper>
          )

        return (
          <Paper className="todos scroll">
            <List>
              {data.todos.map(({ id, title, completed }) => (
                <Mutation mutation={SET_COMPLETED} key={id}>
                  { (setCompleted) => (
                    <ListItem className="todo"
                              onClick={() => {
                                setCompleted({ variables: { id, completed: !completed } });
                              }}
                              dense
                              button>
                      <Checkbox checked={completed} tabIndex={-1} disableRipple />
                      <ListItemText primary={title}
                                    secondary={completed? 'Completed' : 'In Progress'} />
                    </ListItem>
                  )}
                </Mutation>
              ))}
            </List>
          </Paper>
        )
      }
    }
  </Query>
)