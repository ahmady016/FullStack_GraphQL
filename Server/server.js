import express from 'express';
import env from './env';

const PORT = process.env.PORT || env.PORT;
const server = express();
server.listen(PORT, () => console.log(`server running at port:${PORT} \n${new Date().toLocaleString()}`));