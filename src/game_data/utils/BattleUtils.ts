import { BattleResult } from "../../interfaces/BattleInterface";
import { MonsterEntity } from "../classes/MonsterEntity";
import { Soldier } from "../classes/Soldier";

export abstract class BattleUtils {
    static fight(attacker: Soldier | MonsterEntity, defender: Soldier | MonsterEntity) {
        let rounds = 0;
        while (attacker.isAlive() && defender.isAlive()) {
            this.round(attacker, defender);
            this.round(defender, attacker);
            rounds++
        }
        const winner = attacker.isAlive() ? attacker : defender

        return { winner: winner.status(), rounds }
    }

    private static round(attacker: Soldier | MonsterEntity, defender: Soldier | MonsterEntity) {
        const attackRoll = this.randomize(attacker.strength);
        const defenseRoll = this.randomize(defender.defense);
        const fightResult = defenseRoll - attackRoll;
        const lifeLost = fightResult < 0 ? fightResult : 0;
        defender.infligeDamage(lifeLost * -1);
        const defenderLifePoints = defender.lifePoints;
        const battleStatus = {
            attacker: attacker.name,
            defender: defender.name,
            attackRoll,
            defenseRoll,
            lifeLost,
            defenderLifePoints
        }
        console.log(battleStatus)
        return battleStatus
    }

    private static randomize(value: number): number {
        const randomizedValue = +(Math.random() * value).toFixed(0);
        return randomizedValue
    }
}