import { AppDataSource } from "../data-source";
import { Character } from "../entities/Chararacter";
import { CharacterError } from "../errors/CharactersErrors";
import { AccountRepository } from "./AccountRepository";

//export const CharacterRepository = AppDataSource.getRepository(Character);

export abstract class CharacterRepository {
    private static characterRepository = AppDataSource.getRepository(Character);

    public static async createCharacter(accountId: number, name: string, profession: string): Promise<Character> {
        const account = await AccountRepository.findAccountById(accountId);
        const newCharacter = this.characterRepository.create({ name, profession, account });
        await this.characterRepository.save(newCharacter);
        const { account: _, ...savedNewCharacter } = newCharacter
        return savedNewCharacter as Character
    }

    public static async findCharacter(characterId: number): Promise<Character> {
        const character = await this.characterRepository.findOneBy({ id: characterId });
        if (!character) throw new CharacterError("Character not found")
        return character
    }

    public static async findAccountCharacters(accountId: number): Promise<Character[]> {
        const account = await AccountRepository.findAccountById(accountId);
        const characters = await this.characterRepository.findBy({ account });
        return characters
    }
}