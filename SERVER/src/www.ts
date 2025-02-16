#!/usr/bin/env node
import "dotenv/config";
import app from './app';
import logger from 'debug';
import http from 'http';
import { NODE_ENV, PORT } from './constants/env';

const debug = logger('server:server');

const port = normalizePort(String(PORT || '3000'));
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`server listening on ${PORT} port in ${NODE_ENV} environment.`));
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);
  
  if (isNaN(port)) {
    return val; // named pipe
  }

  return port >= 0 ? port : false; // port number or false
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr ? addr.port: 'unknown');
  debug('Listening on ' + bind);
}
