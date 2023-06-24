import { DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Character } from "../entities/Chararacter";
import { CharacterError } from "../errors/CharactersErrors";
import { AccountRepository } from "./AccountRepository";
import { ProfessionUtils } from "../utils/ProfessionUtils";
import { Soldier } from "../game_data/classes/Soldier";
import { SoldierStatus } from "../interfaces/CharactersInterface";

export abstract class CharacterRepository {
    private static characterRepository = AppDataSource.getRepository(Character);

    public static async create(accountId: number, name: string, profession: string): Promise<SoldierStatus> {
        const account = await AccountRepository.findById(accountId);
        const newCharacter = this.characterRepository.create({ name, profession, account });
        await this.characterRepository.save(newCharacter);
        const newSoldier = ProfessionUtils.DefineProfession(newCharacter)
        return newSoldier
    }

    public static async findOne(characterId: number, accountId: number): Promise<SoldierStatus | null> {
        const account = await AccountRepository.findById(accountId);
        const character = await this.characterRepository.findOneBy({ id: characterId, account });
        if (character) {
            const newSoldier = ProfessionUtils.DefineProfession(character);
            return newSoldier
        }
        return character
    }

    public static async findAllinAccount(accountId: number): Promise<SoldierStatus[] | undefined> {
        const account = await AccountRepository.findById(accountId);
        const characters = await this.characterRepository.findBy({ account });
        if (characters.length > 0) {
            const Soldiers: SoldierStatus[] = [];
            characters.forEach(c => Soldiers.push(ProfessionUtils.DefineProfession(c)))
            return Soldiers
        }
        return undefined
    }

    public static async findAll(): Promise<SoldierStatus[] | undefined> {
        const characters = await this.characterRepository.find();
        if (characters.length > 0) {
            const Soldiers: SoldierStatus[] = [];
            characters.forEach(c => Soldiers.push(ProfessionUtils.DefineProfession(c)))
            return Soldiers
        }
        return undefined
    }

    public static async deleteOneById(accountId: number, characterId: number): Promise<DeleteResult> {
        const account = await AccountRepository.findById(accountId);
        const removedCaracter = await this.characterRepository.delete({ id: characterId, account });
        return removedCaracter
    }
}