import { Router } from 'express';
import Controller from './test.controller';

const user: Router = Router();
const controller = new Controller();

user.get('/api1', controller.api1);
user.get('/api2', controller.api2);
user.get('/api3', controller.api3);

export default user;