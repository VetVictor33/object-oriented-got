import { Request, Response } from "express";
import { AccountRepository } from "../repositories/AccountRepository";
import { QueryFailedError } from "typeorm";
import bcrypt from "bcrypt";
import JwsUtils from "../utils/JwsUtils";

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

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const userData = await AccountRepository.findOneBy({ email });

      if (!userData) return res.status(400).json({ message: "Invalid credentials" });

      const { password: passwordHash, ...user } = userData;

      const isPasswordCorrent = await bcrypt.compare(password, passwordHash);

      if (!isPasswordCorrent) return res.status(400).json({ message: "Invalid credentials" })

      const token = JwsUtils.generateToken(user.id);

      const response = { token, user }

      return res.json(response);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}