import { AppDataSource } from "../data-source";
import { Character } from "../entities/Chararacter";

export const CharacterRepository = AppDataSource.getRepository(Character);