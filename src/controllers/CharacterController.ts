import { Request, Response } from "express";
import { CharacterRepository } from "../repositories/CharacterRepository";
import { AccountRepository } from "../repositories/AccountRepository";
import { QueryFailedError } from "typeorm";
import { CharacterError } from "../errors/CharactersErrors";

export default class CharacterController {
    async create(req: Request, res: Response) {
        const { name, profession } = req.body
        const { id: accountId } = req.user;
        try {
            const account = await AccountRepository.findOneBy({ id: accountId });
            if (!account) throw new Error
            const characters = await CharacterRepository.findBy({ account });
            if (characters.length >= 3)
                throw new CharacterError("You may only have 3 characters per account")

            const newChar = CharacterRepository.create({ name, profession, account });
            await CharacterRepository.save(newChar);
            const { account: _, ...character } = newChar;

            return res.status(201).json(character);
        } catch (error) {
            console.log(error)
            if (error instanceof QueryFailedError) {
                return res.status(400).json({ message: "Name already taken" })
            } else if (error instanceof CharacterError) {
                return res.status(400).json({ message: error.message })
            }
            return res.status(500).json({ message: "Internal server error" })
        }
    }
    async list(req: Request, res: Response) {
        try {
            const { id: accountId } = req.user;
            const account = await AccountRepository.findOneBy({ id: accountId });
            if (!account) throw new Error
            const characters = await CharacterRepository.findBy({ account });
            if (!characters) return res.status(404).json({ message: "You have no characters yet!" })

            return res.json(characters)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}