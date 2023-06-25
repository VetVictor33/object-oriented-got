import { Monster } from "../../entities/Monster";
import { defaultMonsterEntityDefense, defaultMonsterEntityLife, defaultMonsterEntityStrength } from "../utils/balance/MonsterEntityBalance";
import { Soldier } from "./Soldier";

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

    public get name(): string {
        return this._name
    }

    public get defense(): number {
        return this._defense
    }

    public get strength(): number {
        return this._strength
    }

    public get lifePoints(): number {
        return this._lifePoints
    }

    public infligeDamage(damage: number): void {
        this._lifePoints -= damage
    }

    public isAlive(): boolean {
        return this._lifePoints > 0 ? true : false
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

}