import { NextFunction, Request, Response } from "express";
import JwsUtils from "../utils/JwsUtils";
import { AccountRepository } from "../repositories/AccountRepository";

export class ValidateToken {
    async validate(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        try {
            if (!authorization) throw new Error
            const token: string = authorization.split(' ')[1];
            const validToken = JwsUtils.validateToken(token);
            const { userId: id } = validToken;

            const Account = await AccountRepository.findById(+id);

            const { password: _, ...user } = Account!;

            req.user = user;

            next()
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized!" })
        }
    }
}