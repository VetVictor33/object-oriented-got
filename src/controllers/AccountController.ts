import { Request, Response } from "express";
import { AccountRepository } from "../repositories/AccountRepository";
import bcrypt from "bcrypt";
import { QueryFailedError } from "typeorm";

export class AccountController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = AccountRepository.create(
        { email, password: encryptedPassword });

      await AccountRepository.save(newUser);

      return res.status(201).json(newUser)
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return res.status(400).json({ messsage: "You may not use this email" })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}