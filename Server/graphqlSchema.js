import { makeExecutableSchema } from 'graphql-tools'
import { fetch } from './env'

const typeDefs = [`
  type Comment {
    id: Int!,
    email: String,
    body: String,
    postId: Int,
    post: Post
  }
  type Post {
    id: Int!,
    title: String,
    body: String,
    userId: Int,
    user: User,
    comments: [Comment]
  }
  type Photo {
    id: Int!,
    title: String,
    url: String,
    thumbnailUrl: String,
    albumId: Int,
    album: Album
  }
  type Album {
    id: Int!,
    title: String,
    userId: Int,
    user: User,
    photos: [Photo]
  }
  type Todo {
    id: Int!,
    title: String,
    completed: Boolean,
    userId: Int,
    user: User
  }
  type Geo {
    lat: String,
    lng: String
  }
  type Address {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: Geo
  }
  type Company {
    name: String,
    catchPhrase: String,
    bs: String
  }
  type User {
    id: Int!,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    address: Address,
    company: Company,
    posts: [Post],
    albums: [Album],
    todos: [Todo]
  }
  type Query {
    users: [User],
    user(id: Int!): User,
    posts: [Post],
    post(id: Int!): Post,
    comments: [Comment],
    comment(id: Int!): Comment,
    albums: [Album],
    album(id: Int!): Album,
    photos: [Photo],
    photo(id: Int!): Photo,
    todos: [Todo],
    todo(id: Int!): Todo
  }
  input GeoInput {
    lat: String,
    lng: String
  }
  input AddressInput {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: GeoInput
  }
  input CompanyInput {
    name: String,
    catchPhrase: String,
    bs: String
  }
  type Mutation {
    addUser(
      name: String!,
      username: String!,
      email: String!,
      phone: String,
      website: String,
      address: AddressInput,
      company: CompanyInput
    ): User
    updateUser(
      id: Int!,
      name: String,
      username: String,
      email: String,
      phone: String,
      website: String,
      address: AddressInput,
      company: CompanyInput
    ): User
    deleteUser(id: Int!): User
  }
`];

const resolvers = {
  User: {
    posts: user =>  fetch('get',`/users/${user.id}/posts`),
    albums: user => fetch('get',`/users/${user.id}/albums`),
    todos: user =>  fetch('get',`/users/${user.id}/todos`)
  },
  Post: {
    user: post => fetch('get',`/users/${post.userId}`),
    comments: post =>  fetch('get',`/posts/${post.id}/comments`)
  },
  Comment: {
    post: comment => fetch('get',`/posts/${comment.postId}`)
  },
  Album: {
    user: album => fetch('get',`/users/${album.userId}`),
    photos: album =>  fetch('get',`/albums/${album.id}/photos`)
  },
  Photo: {
    album: photo => fetch('get',`/albums/${photo.albumId}`)
  },
  Todo: {
    user: todo => fetch('get',`/users/${todo.userId}`)
  },
  Query: {
    users: () => fetch('get',`/users`),
    user: (_, { id }) => fetch('get',`/users/${id}`),
    posts: () => fetch('get',`/posts`),
    post: (_, { id }) => fetch('get',`/posts/${id}`),
    comments: () => fetch('get',`/comments`),
    comment: (_, { id }) => fetch('get',`/comments/${id}`),
    albums: () => fetch('get',`/albums`),
    album: (_, { id }) => fetch('get',`/albums/${id}`),
    photos: () => fetch('get',`/photos`),
    photo: (_, { id }) => fetch('get',`/photos/${id}`),
    todos: () => fetch('get',`/todos`),
    todo: (_, { id }) => fetch('get',`/todos/${id}`)
  },
  Mutation: {
    addUser:    (_, args) => fetch('post',`/users`,args),
    updateUser: (_, args) => fetch('patch', `/users/${args.id}`,args),
    deleteUser: (_, args) => fetch('delete',`/users/${args.id}`,args)
  }
};

export default makeExecutableSchema({
    typeDefs,
    resolvers,
  });