import express from 'express'
import env from './env'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import schema from './graphqlSchema'

const PORT = process.env.PORT || env.PORT;
const server = express();
server.listen(PORT, () => console.log(`server running at port:${PORT} \n${new Date().toLocaleString()}`));

server.use(cors());
server.use(env.graphqlURL,  bodyParser.json(), graphqlExpress({ schema }));
server.use(env.graphiqlURL, graphiqlExpress({ endpointURL: env.graphqlURL }));