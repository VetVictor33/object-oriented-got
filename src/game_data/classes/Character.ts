import { defaultCharacterDefense, defaultCharacterLife, defaultCharacterStrength } from "../utils/balance/CharacterBalance";
import { MonsterEntity } from "./MonsterEntity";

export abstract class Character {
    protected _name: string;
    protected _lifePoints: number;
    protected _strength: number;
    protected _defense: number;

    constructor(name: string) {
        this._name = name;
        this._lifePoints = defaultCharacterLife;
        this._strength = defaultCharacterStrength;
        this._defense = defaultCharacterDefense
    }

    public abstract status(): object;
    public abstract attack(defender: Character | MonsterEntity): number;
    public abstract defend(attacker: Character | MonsterEntity): number;

}