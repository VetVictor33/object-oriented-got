import { NextFunction, Request, Response } from "express";

export class ValidadeCharacterData {
    creation(req: Request, res: Response, next: NextFunction) {
        const { name, profession } = req.body;
        if (!name || !profession) {
            return res.status(400).json({ message: "Inform both name and profession to create a cracter" })
        } else if (profession !== 'warrior' && profession !== 'mage' && profession !== 'priest') {
            return res.status(400).json({ message: "Invalid profession. Choose: mage, priest or warrior" })
        }
        next();
    }
    deletation(req: Request, res: Response, next: NextFunction) {
        const { id: characterId } = req.body;
        if (!characterId) {
            return res.status(400).json({ message: "Inform character id" })
        }
        next();
    }
}