import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';

export class UserController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const encryptedPassword = bcrypt
            const newUser = userRepository.create(
                { email, password: encryptedPassword });

            await userRepository.save(newUser);

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}