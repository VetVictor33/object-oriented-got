import { Request, Response } from "express";
import { AccountRepository } from "../repositories/AccountRepository";
import bcrypt from "bcrypt";
import JwsUtils from "../utils/JwsUtils";
import { AccountError } from "../errors/AccountErrors";
import { CharacterRepository } from "../repositories/CharacterRepository";

export class AccountController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      await AccountRepository.createAccount(email, encryptedPassword);
      return res.status(204).send()
    } catch (error) {
      if (error instanceof AccountError) {
        return res.status(400).json({ messsage: "You may not use this email" })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const accountData = await AccountRepository.findByEmail(email);

      const { password: passwordHash, ...account } = accountData;

      const isPasswordCorrent = await bcrypt.compare(password, passwordHash);

      if (!isPasswordCorrent) throw new AccountError('');

      const token = JwsUtils.generateToken(account.id);

      const response = { token, user: account }

      return res.json(response);

    } catch (error) {
      if (error instanceof AccountError) {
        return res.status(400).json({ messsage: "Invalid credentials" })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async info(req: Request, res: Response) {
    try {
      const { id: accountId, email } = req.user
      const characters = await CharacterRepository.findAllinAccount(accountId);
      const data = { email, characters }
      res.json(data)

    } catch (error) {
      if (error instanceof AccountError) {
        return res.status(400).json({ messsage: "Invalid credentials" })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }
}