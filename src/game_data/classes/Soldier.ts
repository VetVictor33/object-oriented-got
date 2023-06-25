import { Character } from "../../entities/Chararacter";
import { SoldierStatus } from "../../interfaces/CharactersInterface";
import { soldierDefaultDefense, soldierDefaultLife, soldierDefaultStrength } from "../utils/balance/SoldierBalance";
import { MonsterEntity } from "./MonsterEntity";

export abstract class Soldier {
    protected id: number;
    protected _name: string;
    protected profession: string;
    protected level: number;
    protected _lifePoints: number;
    protected _strength: number;
    protected _defense: number;

    constructor(soldier: Character) {
        this.id = soldier.id;
        this._name = soldier.name;
        this.profession = soldier.profession;
        this.level = soldier.level;
        this._lifePoints = soldierDefaultLife;
        this._strength = soldierDefaultStrength;
        this._defense = soldierDefaultDefense
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

    public status(): SoldierStatus {
        return {
            id: this.id,
            name: this._name,
            profession: this.profession,
            level: this.level,
            lifePoints: this._lifePoints,
            strength: this._strength,
            defense: this._defense
        };
    }
}