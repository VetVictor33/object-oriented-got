import { Request, Response } from "express";
import { MonsterRepository } from "../repositories/MonsterRepository";
import { MonsterError } from "../errors/MonstersErrors";
import { MonsterEntity } from "../game_data/classes/MonsterEntity";

export default class MonsterController {
    async create(req: Request, res: Response) {
        const { name, dificulty } = req.body;
        try {
            const newMonster = await MonsterRepository.create(name, dificulty)
            console.log(newMonster);
            return res.json(newMonster);
        } catch (error) {
            console.log(error)
            if (error instanceof MonsterError) {
                return res.status(400).json({ message: "Invalid data" })
            }
            return res.status(500).json({ message: "Internal server error" })
        }
    }
    async listAll(req: Request, res: Response) {
        try {
            const monsters = await MonsterRepository.findAll();
            return res.json(monsters);
        } catch (error) {
            console.log(error)
            if (error instanceof MonsterError) {
                return res.status(400).json({ message: "Invalid data" })
            }
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}