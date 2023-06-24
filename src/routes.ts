import { IRouterMatcher, Router } from 'express';
import { AccountController } from './controllers/AccountController';
import { ValidadeAccountData } from './middlewares/validateAccountData';
import { validateToken } from './middlewares/validateToken';
import CharacterController from './controllers/CharacterController';
import { ValidadeCharacterData } from './middlewares/validateCharacterData';

const routes = Router();

routes.post('/account/create', new ValidadeAccountData().creation as any, new AccountController().create as any);
routes.post('/account/login', new ValidadeAccountData().login as any, new AccountController().login as any);

routes.get('/characters', new CharacterController().listAll as any);

routes.use(new validateToken().validate as any);

routes.get('/account', new AccountController().info as any);
routes.get('/account/characters', new CharacterController().listByAccount as any);
routes.post('/account/characters/create', new ValidadeCharacterData().creation as any, new CharacterController().create as any);
routes.delete('/account/characters/delete', new ValidadeCharacterData().deletation as any, new CharacterController().delete as any);


export default routes