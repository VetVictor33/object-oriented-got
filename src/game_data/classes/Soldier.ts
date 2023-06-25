import { Character } from "../../entities/Chararacter";
import { SoldierStatus } from "../../interfaces/CharactersInterface";
import { soldierDefaultDefense, soldierDefaultLife, soldierDefaultStrength } from "../utils/balance/SoldierBalance";

export abstract class Soldier {
    protected _id: number;
    protected _name: string;
    protected profession: string;
    protected _level: number;
    protected _experience: number;
    protected _lifePoints: number;
    protected _strength: number;
    protected _defense: number;

    constructor(soldier: Character) {
        this._id = soldier.id;
        this._name = soldier.name;
        this.profession = soldier.profession;
        this._level = soldier.level;
        this._experience = soldier.experience;
        this._lifePoints = Math.floor(soldierDefaultLife * this._level);
        this._strength = Math.floor(soldierDefaultStrength * this._level);
        this._defense = Math.floor(soldierDefaultDefense * this._level)
    }


    public get id(): number {
        return this._id
    }

    public get name(): string {
        return this._name
    }


    public get level(): number {
        return this._level
    }

    public get experience(): number {
        return this._experience
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
            id: this._id,
            name: this._name,
            profession: this.profession,
            level: this._level,
            experience: this._experience,
            lifePoints: this._lifePoints,
            strength: this._strength,
            defense: this._defense
        };
    }
}