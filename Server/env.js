import axios from 'axios';

export default {
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
  request(method, url, data = {}) {
    return axios[method](`${this.dbURLurl}${url}`,data)
                .then(res => res.data);
  }
}