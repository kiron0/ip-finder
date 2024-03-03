/* eslint-disable no-console */
import colors from "colors";
import { Server } from 'http';
import app from './app';
import config from './config';

let server: Server;

async function main() {
          try {
                    server = app.listen(config.port, () => {
                              console.log(colors.green.bold.italic(`🌐 Server running on port ${config.port} 🔥`))
                    });
          } catch (err) {
                    console.log(colors.red.bold.italic(`${err}`))
          }
}

main();

process.on('unhandledRejection', () => {
          console.log(colors.red.bold.italic(`😈 unhandledRejection is detected , shutting down ...`));
          if (server) {
                    server.close(() => {
                              process.exit(1);
                    });
          }
          process.exit(1);
});

process.on('uncaughtException', () => {
          console.log(colors.red.bold.italic(`😈 uncaughtException is detected , shutting down ...`));
          process.exit(1);
});