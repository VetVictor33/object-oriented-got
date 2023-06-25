import { Router } from 'express';
import { AccountController } from './controllers/AccountController';
import { ValidadeAccountData } from './middlewares/validateAccountData';
import { validateToken } from './middlewares/validateToken';
import CharacterController from './controllers/CharacterController';
import { ValidadeCharacterData } from './middlewares/validateCharacterData';
import { validateAdmin } from './middlewares/validateAdmin';
import MonsterController from './controllers/MonsterController';
import { ValidadeMonsterData } from './middlewares/validateMonsterData';
import FightController from './controllers/FightController';

const routes = Router();

routes.post('/account/create', new ValidadeAccountData().creation as any, new AccountController().create as any);
routes.post('/account/login', new ValidadeAccountData().login as any, new AccountController().login as any);

routes.get('/characters', new CharacterController().listAll as any);
routes.get('/monsters', new MonsterController().listAll as any);

routes.use(new validateToken().validate as any);

routes.get('/account', new AccountController().info as any);
routes.get('/account/characters', new CharacterController().listByAccount as any);
routes.post('/account/characters/create', new ValidadeCharacterData().creation as any, new CharacterController().create as any);
routes.delete('/account/characters/delete', new ValidadeCharacterData().deletation as any, new CharacterController().delete as any);

routes.post('/fight', new FightController().fight as any);

routes.use(new validateAdmin().validate as any);

routes.get('/admin/accounts', new AccountController().allInfo as any);

routes.post('/admin/monsters/create', new ValidadeMonsterData().creation as any, new MonsterController().create as any);
routes.get('/admin/monsters', new MonsterController().listAll as any);


export default routes