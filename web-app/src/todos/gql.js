import gql from "graphql-tag";

export const TODOS = gql`
{
  todos {
    id
    title
    completed
  }
}
`;

export const SET_COMPLETED = gql`
  mutation setCompleted($id: Int!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;