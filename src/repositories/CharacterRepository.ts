import { DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Character } from "../entities/Chararacter";
import { CharacterError } from "../errors/CharactersErrors";
import { AccountRepository } from "./AccountRepository";

export abstract class CharacterRepository {
    private static characterRepository = AppDataSource.getRepository(Character);

    public static async create(accountId: number, name: string, profession: string): Promise<Character> {
        const account = await AccountRepository.findById(accountId);
        const newCharacter = this.characterRepository.create({ name, profession, account });
        await this.characterRepository.save(newCharacter);
        const { account: _, ...savedNewCharacter } = newCharacter
        return savedNewCharacter as Character
    }

    public static async findOne(characterId: number, accountId: number): Promise<Character | null> {
        const account = await AccountRepository.findById(accountId);
        const character = await this.characterRepository.findOneBy({ id: characterId, account });
        return character
    }

    public static async findAllinAccount(accountId: number): Promise<Character[]> {
        const account = await AccountRepository.findById(accountId);
        const characters = await this.characterRepository.findBy({ account });
        return characters
    }

    public static async findAll(): Promise<Character[]> {
        const characters = await this.characterRepository.find();
        return characters
    }

    public static async deleteOneById(accountId: number, characterId: number): Promise<DeleteResult> {
        const account = await AccountRepository.findById(accountId);
        const removedCaracter = await this.characterRepository.delete({ id: characterId, account });
        return removedCaracter
    }
}