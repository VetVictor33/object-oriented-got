import { NextFunction, Request, Response } from "express";

export class ValidadeCharacterData {
    validateNameChange(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Inform name to update character" })
        }
        next();
    }
}