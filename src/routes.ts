import express, { Router } from "express"
import { AccountController } from "./controllers/AccountController";
import { ValidadeAccountData } from "./middlewares/validateAccountData";
import { ValidateToken } from "./middlewares/validateToken";
import CharacterController from "./controllers/CharacterController";
import { ValidadeCharacterData } from "./middlewares/validateCharacterData";
import { ValidateAdmin } from "./middlewares/validateAdmin";
import { ValidadeMonsterData } from "./middlewares/validateMonsterData";
import MonsterController from "./controllers/MonsterController";
import FightController from "./controllers/FightController";

export default class Routes {
    public router: Router;

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
        this.router = express.Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {
        this.router.get('/', (req, res) => res.send('Object Oriented GOT is alive!'))
        this.router.post('/account/create', this.validateAccount.creation as any, this.accountController.create as any);
        this.router.post('/account/login', this.validateAccount.login as any, this.accountController.login as any);

        this.router.use(this.protectedRoutes.validate as any);
        this.router.post('/fight', new FightController().fight as any);

        this.router.get('/account', this.accountController.info as any);
        this.router.get('/account/characters', this.characterController.listByAccount as any);
        this.router.post('/account/characters/create', this.validateCharacter.creation as any, this.characterController.create as any);
        this.router.delete('/account/characters/delete', this.validateCharacter.deletation as any, this.characterController.delete as any);

        this.router.use(this.adminOnlyRoutes.validate as any)
        this.router.get('/admin/accounts', this.accountController.allInfo as any);

        this.router.post('/admin/monsters/create', this.validateMonster.creation as any, this.monsterController.create as any);
        this.router.get('/admin/monsters', this.monsterController.listAll as any);
    }
}