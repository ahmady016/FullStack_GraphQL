import { makeExecutableSchema } from 'graphql-tools'
import env from './env'

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
`];

const resolvers = {
  User: {
    posts: user =>  env.request('get',`/users/${user.id}/posts`),
    albums: user => env.request('get',`/users/${user.id}/albums`),
    todos: user =>  env.request('get',`/users/${user.id}/todos`)
  },
  Post: {
    user: post => env.request('get',`/users/${post.userId}`),
    comments: post =>  env.request('get',`/posts/${post.id}/comments`)
  },
  Comment: {
    post: comment => env.request('get',`/posts/${comment.postId}`)
  },
  Album: {
    user: album => env.request('get',`/users/${album.userId}`),
    photos: album =>  env.request('get',`/albums/${album.id}/photos`)
  },
  Photo: {
    album: photo => env.request('get',`/albums/${photo.albumId}`)
  },
  Todo: {
    user: todo => env.request('get',`/users/${todo.userId}`)
  },
  Query: {
    users: () => env.request('get',`/users`),
    user: (_, { id }) => env.request('get',`/users/${id}`),
    posts: () => env.request('get',`/posts`),
    post: (_, { id }) => env.request('get',`/posts/${id}`),
    comments: () => env.request('get',`/comments`),
    comment: (_, { id }) => env.request('get',`/comments/${id}`),
    albums: () => env.request('get',`/albums`),
    album: (_, { id }) => env.request('get',`/albums/${id}`),
    photos: () => env.request('get',`/photos`),
    photo: (_, { id }) => env.request('get',`/photos/${id}`),
    todos: () => env.request('get',`/todos`),
    todo: (_, { id }) => env.request('get',`/todos/${id}`)
  }
};

export default makeExecutableSchema({
    typeDefs,
    resolvers,
  });