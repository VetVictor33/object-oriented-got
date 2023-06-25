import { Request, Response } from "express";
import { CharacterRepository } from "../repositories/CharacterRepository";
import { MonsterRepository } from "../repositories/MonsterRepository";
import { BattleUtils } from "../game_data/utils/BattleUtils";

export default class FightController {
    async fight(req: Request, res: Response) {
        const { id: accountId } = req.user;
        const { fightType, attackerId, defenderId } = req.body;

        try {
            const attacker = await CharacterRepository.findOneinAccount(attackerId, accountId);
            let defender;
            if (fightType === "pvp") {
                defender = await CharacterRepository.findOne(defenderId);
            } else if (fightType === "pvm") {
                defender = await MonsterRepository.findMonsterById(defenderId);
            }
            if (!attacker || !defender || (fightType !== "pvp" && fightType !== "pvm")) {
                return res.status(400).json({ message: "Invalid data" })
            }
            const fightResult = await BattleUtils.fight(attacker, defender)
            res.json({ fightResult })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}