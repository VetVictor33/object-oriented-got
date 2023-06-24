import { IRouterMatcher, Router } from 'express';
import { AccountController } from './controllers/AccountController';
import { ValidadeAccountData } from './middlewares/validateAccountData';
import { validateToken } from './middlewares/validateToken';
import CharacterController from './controllers/CharacterController';

const routes = Router();

routes.post('/account/create', new ValidadeAccountData().validateCreation as any, new AccountController().create as any);
routes.post('/account/login', new ValidadeAccountData().validateLogin as any, new AccountController().login as any);

routes.use(new validateToken().validate as any);

routes.post('/account/characters', new CharacterController().list as any);
routes.post('/account/characters/create', new CharacterController().create as any);


export default routes