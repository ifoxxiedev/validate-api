import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupRoutes } from '../../api/routes';

export class Server {
  private readonly app: express.Application;
  private readonly server: http.Server;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app)

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    this.app.set('trust proxy', true);

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: '50mb'}));
    this.app.use(cors({ origin: '*'}));
    this.app.use(helmet());
  } 

  private setupRoutes() {
    setupRoutes(this.app)

  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`API is running on ${this.port}`)
    })
  }
}