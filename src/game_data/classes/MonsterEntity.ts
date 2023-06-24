import { Monster } from "../../entities/Monster";
import { defaultMonsterEntityDefense, defaultMonsterEntityLife, defaultMonsterEntityStrength } from "../utils/balance/MonsterEntityBalance";
import { Character } from "./Character";

export class MonsterEntity {
    private _name: string;
    private _lifePoints: number;
    private _strength: number;
    private _defense: number;

    constructor(moster: Monster) {
        this._name = moster.name;
        this._lifePoints = (defaultMonsterEntityLife * moster.dificulty);
        this._strength = (defaultMonsterEntityStrength * moster.dificulty);
        this._defense = (defaultMonsterEntityDefense * moster.dificulty);
    }

    public status(): object {
        const response = {
            name: this._name,
            lifePoints: this._lifePoints,
            strength: this._strength,
            defense: this._defense
        }
        return response
    };
    //TODO: create mage, warriror, priest classes so attack and defense may by implemented
    // public attack(defender: Character): number{

    // };
    // public defend(attacker: Character): number;

}