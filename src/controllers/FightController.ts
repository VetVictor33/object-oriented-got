import { Request, Response } from "express";
import { CharacterRepository } from "../repositories/CharacterRepository";
import { MonsterRepository } from "../repositories/MonsterRepository";
import { BattleUtils } from "../game_data/utils/BattleUtils";

export default class FightController {
    async fight(req: Request, res: Response) {
        const { id: accountId } = req.user;
        const { caracterId, monsterId } = req.body;

        try {
            const char = await CharacterRepository.findOne(caracterId, accountId);
            const monster = await MonsterRepository.findMonsterById(monsterId);

            const fightResult = BattleUtils.fight(monster!, char!)
            res.json({ winner: fightResult })

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}