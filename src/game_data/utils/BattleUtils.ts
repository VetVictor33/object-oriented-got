import { BattleResult } from "../../interfaces/BattleInterface";
import { CharacterRepository } from "../../repositories/CharacterRepository";
import { MonsterEntity } from "../classes/MonsterEntity";
import { Soldier } from "../classes/Soldier";

export abstract class BattleUtils {

    private static levelUpFactor = 2;
    private static baseExperienceForLevelUp = 10;
    private static monsterEntetyExperienceFactor = 2;
    private static soldierExperienceFactor = 3;
    private static experienceDownFactor = 0.05;

    static async fight(attacker: Soldier | MonsterEntity, defender: Soldier | MonsterEntity): Promise<object> {
        let rounds = 0;
        const battleData = []
        while (attacker.isAlive() && defender.isAlive()) {
            this.round(attacker, defender);
            this.round(defender, attacker);
            rounds++
        }
        const winner = attacker.isAlive() ? attacker : defender.isAlive() ? defender : undefined;
        const loser = attacker.isAlive() ? defender : attacker;
        if (!winner) return { battleResult: "Tie!" }

        battleData.push({ rounds });
        const battleInfo = await this.calcExperience(winner, loser);
        battleData.push(battleInfo);

        return battleData
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
        return battleStatus
    }

    private static async calcExperience(winner: Soldier | MonsterEntity, loser: Soldier | MonsterEntity): Promise<Array<object>> {
        const battleData = [];
        battleData.push(
            { battleResult: { winner: winner.name, loser: loser.name } }
        );
        if (winner instanceof Soldier) {
            const winnerData = await this.calcExpGainAndLevelUp(winner, loser);
            battleData.push({ winnerData })
        }
        if (loser instanceof Soldier) {
            const loserData = await this.calcExpLostAndLevelDown(loser);
            battleData.push({ loserData })
        }
        return battleData
    }

    private static async calcExpGainAndLevelUp(winner: Soldier, loser: Soldier | MonsterEntity): Promise<object> {

        const loserLevel = loser instanceof Soldier ? loser.level : loser.dificulty;
        const experienceFactor = loser instanceof Soldier ? this.soldierExperienceFactor : this.monsterEntetyExperienceFactor;
        const experienceGain = Math.floor(loserLevel * experienceFactor);
        const winnerCurrentExp = winner.experience;
        const totalWinnerExp = winnerCurrentExp + experienceGain;

        const currentLevel = winner.level;
        let level = winner.level;

        while ((Math.floor(this.baseExperienceForLevelUp * level * this.levelUpFactor)) < totalWinnerExp) {
            level++
        }
        await CharacterRepository.updateExperience(winner, totalWinnerExp);
        if (winner.level < level) {
            await CharacterRepository.updateLevel(winner, level)
            return {
                experienceGain,
                levelUp: `From ${currentLevel} to ${level}`
            }
        }
        return { experienceGain }
    }

    private static async calcExpLostAndLevelDown(loser: Soldier): Promise<object> {
        let level = loser.level;
        let lostLevel = 0;
        const lostExperience = Math.floor(loser.experience * this.experienceDownFactor)
        let loserExperience = Math.floor(loser.experience - lostExperience);
        const newLoserExp = loserExperience;

        while ((this.baseExperienceForLevelUp * level * this.levelUpFactor) > loserExperience && level > 1) {
            level--
            lostLevel++
        }
        await CharacterRepository.updateExperience(loser, newLoserExp);
        if (lostLevel > 0) {
            await CharacterRepository.updateLevel(loser, level);
            return { lostExperience, levelDown: `From ${level + lostLevel} to ${level}` }
        }

        return { lostExperience }
    }

    private static randomize(value: number): number {
        const randomizedValue = +(Math.random() * value).toFixed(0);
        return randomizedValue
    }
}