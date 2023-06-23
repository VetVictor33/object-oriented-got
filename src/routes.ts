import { Router } from 'express';
import { AccountController } from './controllers/AccountController';
import { ValidadeUserData } from './middlewares/validateUserData';

const routes = Router();

routes.post('/user', new ValidadeUserData().create, new AccountController().create)


export default routes