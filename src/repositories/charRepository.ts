import { AppDataSource } from "../data-source";
import { Char } from "../entities/Char";

export const charRepository = AppDataSource.getRepository(Char);