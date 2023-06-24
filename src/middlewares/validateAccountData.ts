import { NextFunction, Request, Response } from "express";

export class ValidadeAccountData {
    creation(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Inform both email and password to create an account" })
        }
        next();
    }
    login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Inform both email and password to log in" })
        }
        next();
    }
}