import { NextFunction, Request, Response } from "express";
import { AccountRepository } from "../repositories/AccountRepository";

export class validateAdmin {
    async validate(req: Request, res: Response, next: NextFunction) {
        const { id } = req.user;

        const { admin: isAdmin } = await AccountRepository.findById(id);

        if (!isAdmin) return res.status(401).json({ message: "Not authorized" })

        next()
    }
}