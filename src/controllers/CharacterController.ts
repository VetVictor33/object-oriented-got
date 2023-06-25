import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { CharacterError } from "../errors/CharactersErrors";
import { CharacterRepository } from "../repositories/CharacterRepository";
import { Soldier } from "../game_data/classes/Soldier";
import { ProfessionUtils } from "../utils/ProfessionUtils";
import { BattleUtils } from "../game_data/utils/BattleUtils";

export default class CharacterController {
    async create(req: Request, res: Response) {
        const { name, profession } = req.body
        const { id: accountId } = req.user;
        try {
            const characters = await CharacterRepository.findAllinAccount(accountId);
            if (characters && characters?.length >= 3) throw new CharacterError("");

            const newChar = await CharacterRepository.create(accountId, name, profession);

            return res.status(201).json(newChar);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                return res.status(400).json({ message: "Name already taken" })
            } else if (error instanceof CharacterError) {
                return res.status(400).json({ message: "You may only have 3 characters per account" })
            }
            return res.status(500).json({ message: "Internal server error" })
        }
    }
    async listByAccount(req: Request, res: Response) {
        try {
            const { id: accountId } = req.user;
            const characters = await CharacterRepository.findAllinAccount(accountId)
            if (!characters) return res.status(404).json({ message: "You have no characters yet!" })
            return res.json(characters)

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" })
        }
    }
    async listAll(req: Request, res: Response) {
        try {
            const characters = await CharacterRepository.findAll();
            if (!characters) throw new CharacterError('');
            return res.json(characters)
        } catch (error) {
            console.log(error)
            if (error instanceof CharacterError) {
                return res.status(404).json({ message: "No characters in the server" })
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async delete(req: Request, res: Response) {
        const { id: characterId, name } = req.body;
        const { id: accountId } = req.user;
        try {
            const { affected } = await CharacterRepository.deleteOneById(accountId, characterId);
            if (affected as number < 1) {
                throw new CharacterError('')
            }
            res.status(204).send()
        } catch (error) {
            if (error instanceof CharacterError) {
                return res.status(404).json({ message: "Character not found" })
            }
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}