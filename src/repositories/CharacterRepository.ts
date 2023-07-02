import { DeleteResult, UpdateResult } from "typeorm";
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
        const newSoldier = ProfessionUtils.DefineProfessionAndReturnStatus(newCharacter)
        return newSoldier
    }

    public static async findOneinAccount(characterName: string, accountId: number): Promise<Soldier | null> {
        const account = await AccountRepository.findById(accountId);
        const character = await this.characterRepository.findOneBy({ name: characterName, account });
        if (character) {
            const newSoldier = ProfessionUtils.DefineProfession(character);
            return newSoldier
        }
        return character
    }
    public static async findOne(characterName: string): Promise<Soldier | null> {
        const character = await this.characterRepository.findOneBy({ name: characterName });
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
            characters.forEach(c => Soldiers.push(ProfessionUtils.DefineProfessionAndReturnStatus(c)))
            return Soldiers
        }
        return undefined
    }

    public static async findAll(): Promise<SoldierStatus[] | undefined> {
        const characters = await this.characterRepository.find();
        if (characters.length > 0) {
            const Soldiers: SoldierStatus[] = [];
            characters.forEach(c => Soldiers.push(ProfessionUtils.DefineProfessionAndReturnStatus(c)))
            return Soldiers
        }
        return undefined
    }

    public static async updateExperience(soldier: Soldier, value: number): Promise<UpdateResult> {
        const updatedCaracter = await this.characterRepository.update({ id: soldier.id }, { experience: value });
        return updatedCaracter
    }

    public static async updateLevel(soldier: Soldier, value: number): Promise<UpdateResult> {
        const updatedCaracter = await this.characterRepository.update({ id: soldier.id }, { level: value });
        return updatedCaracter
    }

    public static async deleteOneById(accountId: number, characterId: number): Promise<DeleteResult> {
        const account = await AccountRepository.findById(accountId);
        const removedCaracter = await this.characterRepository.delete({ id: characterId, account });
        return removedCaracter
    }
}