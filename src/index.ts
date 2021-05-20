import 'reflect-metadata';
import { Server } from './infra/http/server'

new Server(3333).start()