import { Soldier } from "./Soldier";
import { MonsterEntity } from "./MonsterEntity";
import { Character } from "../../entities/Chararacter";

export class Mage extends Soldier {
    private LifePointsModifier: number = 0.6;
    private StrengthModifier: number = 6;
    private DefenseModifier: number = 0.3

    constructor(mage: Character) {
        super(mage)
        this.lifePoints *= this.LifePointsModifier;
        this.strength *= this.StrengthModifier;
        this.defense *= this.DefenseModifier;
    }
    public attack(defender: Soldier | MonsterEntity): number {
        throw new Error("Method not implemented.");
    }
    public defend(attacker: Soldier | MonsterEntity): number {
        throw new Error("Method not implemented.");
    }
}