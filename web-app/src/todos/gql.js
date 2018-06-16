import gql from "graphql-tag";

export const todos = gql`
{
  todos {
    id
    title
    completed
  }
}
`;