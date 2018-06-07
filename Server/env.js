import axios from 'axios';

const env = {
  dbURL: 'http://localhost:5000',
  graphqlURL: '/graphql',
  graphiqlURL: '/graphiql',
  PORT: 4000,
  resources: [
    "users",
    "posts",
    "comments",
    "albums",
    "photos",
    "todos"
  ],
}
const fetch = (method, url, data = {}) => {
  console.log(`${method.toUpperCase()} ${env.dbURL}${url}`);
  return axios[method](`${env.dbURL}${url}`,data)
              .then(res => res.data);
}
export {
  env as default,
  fetch
}