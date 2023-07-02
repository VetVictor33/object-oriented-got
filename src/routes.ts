import express, { Router } from "express";
import { AccountController } from "./controllers/AccountController";
import CharacterController from "./controllers/CharacterController";
import FightController from "./controllers/FightController";
import MonsterController from "./controllers/MonsterController";
import ValidadeAccountData from "./middlewares/ValidateAccountData";
import ValidateAdmin from "./middlewares/ValidateAdmin";
import ValidadeCharacterData from "./middlewares/ValidateCharacterData";
import ValidadeMonsterData from "./middlewares/ValidateMonsterData";
import ValidateToken from "./middlewares/ValidateToken";

export default class Routes {
    public routes: Router;

    private protectedRoutes: ValidateToken = new ValidateToken();
    private adminOnlyRoutes: ValidateAdmin = new ValidateAdmin();

    private validateAccount: ValidadeAccountData = new ValidadeAccountData();
    private validateCharacter: ValidadeCharacterData = new ValidadeCharacterData();
    private validateMonster: ValidadeMonsterData = new ValidadeMonsterData();

    private accountController: AccountController = new AccountController();
    private characterController: CharacterController = new CharacterController();
    private monsterController: MonsterController = new MonsterController();
    private fightController: FightController = new FightController();

    constructor() {
        this.routes = express.Router();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.routes.get('/', (req, res) => res.send('Object Oriented GOT is alive!'))
        this.routes.get('/characters', this.characterController.listAll);
        this.routes.get('/monsters', this.monsterController.listAll);
        this.routes.post('/account/create', this.validateAccount.creation, this.accountController.create);
        this.routes.post('/account/login', this.validateAccount.login, this.accountController.login);

        this.routes.use(this.protectedRoutes.validate);
        this.routes.post('/fight', this.fightController.fight);

        this.routes.get('/account', this.accountController.info);
        this.routes.get('/account/characters', this.characterController.listByAccount);
        this.routes.post('/account/characters/create', this.validateCharacter.creation, this.characterController.create);
        this.routes.delete('/account/characters/delete', this.validateCharacter.deletation, this.characterController.delete);

        this.routes.use(this.adminOnlyRoutes.validate)
        this.routes.get('/admin/accounts', this.accountController.allInfo);

        this.routes.post('/admin/monsters/create', this.validateMonster.creation, this.monsterController.create);
    }
}