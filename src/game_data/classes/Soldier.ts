import { Character } from "../../entities/Chararacter";
import { SoldierStatus } from "../../interfaces/CharactersInterface";
import { soldierDefaultDefense, soldierDefaultLife, soldierDefaultStrength } from "../utils/balance/SoldierBalance";
import { MonsterEntity } from "./MonsterEntity";

export abstract class Soldier {
    protected id: number;
    protected name: string;
    protected profession: string;
    protected level: number;
    protected lifePoints: number;
    protected strength: number;
    protected defense: number;

    constructor(soldier: Character) {
        this.id = soldier.id;
        this.name = soldier.name;
        this.profession = soldier.profession;
        this.level = soldier.level;
        this.lifePoints = soldierDefaultLife;
        this.strength = soldierDefaultStrength;
        this.defense = soldierDefaultDefense
    }

    public abstract attack(defender: Soldier | MonsterEntity): number;
    public abstract defend(attacker: Soldier | MonsterEntity): number;

    public status(): SoldierStatus {
        return {
            id: this.id,
            name: this.name,
            profession: this.profession,
            level: this.level,
            lifePoints: this.lifePoints,
            strength: this.strength,
            defense: this.defense
        };
    }
}