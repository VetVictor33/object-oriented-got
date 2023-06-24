import { NextFunction, Request, Response } from "express";

export class ValidadeMonsterData {
    creation(req: Request, res: Response, next: NextFunction) {
        const { name, dificulty } = req.body;
        if (!name || !dificulty) {
            return res.status(400).json({ message: "Inform both name and dificulty to create a monster" })
        }
        next();
    }
    deletation(req: Request, res: Response, next: NextFunction) {
        const { id: monsterId } = req.body;
        if (!monsterId) {
            return res.status(400).json({ message: "Inform mosnter id" })
        }
        next();
    }
}