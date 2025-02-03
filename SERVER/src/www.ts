#!/usr/bin/env node
import "dotenv/config";
import env from './util/validateEnv';
import app from './app';
import debug from 'debug';
import http from 'http';
import mongoose from "mongoose";

const log = debug('server:server');

const port = normalizePort(String(env.PORT || '3000'));
app.set('port', port);

// Declare the server variable outside of the function
let server: http.Server;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(env.MONGO_URI);
    console.log("Mongoose connected");

    // Create HTTP server
    server = http.createServer(app);

     // Start listening on the specified port
    server.listen(port, () => console.log("server listening on port " + port));
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1)
  }
};

startServer();// Call the function to start the server

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
  log('Listening on ' + bind);
}
