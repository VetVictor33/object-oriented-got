import jwt from "jsonwebtoken";
import { Account } from "../entities/Account";

type LocalJwtPayload = jwt.JwtPayload & {
    userId: object;
};

export default abstract class JwsUtils {
    private static secretKey: string = process.env.JWT_SECRET!;

    public static generateToken(payloud: Account["id"], expiresIn: string = '8h'): string {
        const token = jwt.sign({ userId: payloud }, this.secretKey, { expiresIn })
        return token
    }

    public static validateToken(token: string): LocalJwtPayload {
        try {
            const validation = jwt.verify(token, this.secretKey) as LocalJwtPayload
            return validation
        } catch (error) {
            throw new Error("Invalid token")
        }
    }
}