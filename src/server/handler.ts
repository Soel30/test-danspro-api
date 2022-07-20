import { Address } from "cluster";
import logger from "@utils/logger";

export function onError(
  error: NodeJS.ErrnoException,
  port: number | string | boolean
): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind: string =
    typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);

      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);

      break;
    default:
      throw error;
  }
}

export function onListening(this: any): void {
  const addr: Address = this.address();
  const bind: string =
    typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  logger.info(`Listening on ${bind} with ${process.env.NODE_ENV} mode`);
}
