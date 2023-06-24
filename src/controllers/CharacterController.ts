import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { CharacterError } from "../errors/CharactersErrors";
import { CharacterRepository } from "../repositories/CharacterRepository";

export default class CharacterController {
    async create(req: Request, res: Response) {
        const { name, profession } = req.body
        const { id: accountId } = req.user;
        try {
            const characters = await CharacterRepository.findAccountCharacters(accountId);
            if (characters.length >= 3) throw new CharacterError("");

            const newChar = await CharacterRepository.createCharacter(accountId, name, profession);

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
    async list(req: Request, res: Response) {
        try {
            const { id: accountId } = req.user;
            const characters = await CharacterRepository.findAccountCharacters(accountId)
            if (!characters) return res.status(404).json({ message: "You have no characters yet!" })

            return res.json(characters)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}