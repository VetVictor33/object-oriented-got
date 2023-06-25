import { Soldier } from "./Soldier";
import { MonsterEntity } from "./MonsterEntity";
import { Character } from "../../entities/Chararacter";

export class Mage extends Soldier {
    private LifePointsModifier: number = 0.2;
    private StrengthModifier: number = 0.6;
    private DefenseModifier: number = 0.2

    constructor(mage: Character) {
        super(mage)
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