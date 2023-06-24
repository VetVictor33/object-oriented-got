import { AppDataSource } from "../data-source";
import { Monster } from "../entities/Monster";
import { MonsterError } from "../errors/MonstersErrors";
import { MonsterEntity } from "../game_data/classes/MonsterEntity";

export abstract class MonsterRepository {
    private static monsterRepository = AppDataSource.getRepository(Monster);

    public static async create(name: string, dificulty: number): Promise<MonsterEntity> {
        const newMosnter = this.monsterRepository.create({ name, dificulty });
        await this.monsterRepository.save(newMosnter);
        const monsterEntity = new MonsterEntity(newMosnter)
        return monsterEntity
    }

    public static async findMonsterById(mosnterId: number): Promise<MonsterEntity | null> {
        const monster = (await this.monsterRepository.findOneBy({ id: mosnterId }))
        if (!monster) return monster
        const monsterEntity = new MonsterEntity(monster);
        return monsterEntity
    }

    public static async findAll(): Promise<MonsterEntity[]> {
        const monsters = await this.monsterRepository.find();

        const monstersEntities: MonsterEntity[] = []
        monsters.forEach(m => monstersEntities.push(new MonsterEntity(m)));
        return monstersEntities
    }
}