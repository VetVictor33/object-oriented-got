import { Soldier } from "./Soldier";
import { MonsterEntity } from "./MonsterEntity";
import { Character } from "../../entities/Chararacter";

export class Warrior extends Soldier {
    private LifePointsModifier: number = 0.1;
    private StrengthModifier: number = 0.8;
    private DefenseModifier: number = 0.1;

    constructor(warrior: Character) {
        super(warrior)
        this._lifePoints *= this.LifePointsModifier;
        this._strength *= this.StrengthModifier;
        this._defense *= this.DefenseModifier;
    }
    public attack(defender: Soldier | MonsterEntity): number {
        throw new Error("Method not implemented.");
    }
    public defend(attacker: Soldier | MonsterEntity): number {
        throw new Error("Method not implemented.");
    }

}