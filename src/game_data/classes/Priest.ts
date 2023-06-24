import { Soldier } from "./Soldier";
import { MonsterEntity } from "./MonsterEntity";
import { Character } from "../../entities/Chararacter";

export class Priest extends Soldier {
    private LifePointsModifier: number = 1;
    private StrengthModifier: number = 0.3;
    private DefenseModifier: number = 6

    constructor(priest: Character) {
        super(priest)
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