import { Character } from "../entities/Chararacter";
import { Mage } from "../game_data/classes/Mage";
import { Priest } from "../game_data/classes/Priest";
import { Soldier } from "../game_data/classes/Soldier";
import { Warrior } from "../game_data/classes/Warrior";
import { SoldierStatus } from "../interfaces/CharactersInterface";



export abstract class ProfessionUtils {
    public static DefineProfessionAndReturnStatus(character: Character): SoldierStatus {
        const newSoldier = this.DefineProfession(character);
        const soldierStatus = this.ShowStatus(newSoldier)
        return soldierStatus as SoldierStatus
    }
    public static DefineProfession(character: Character): Soldier {
        let newSoldier;
        switch (character.profession) {
            case ('mage'):
                newSoldier = new Mage(character);
                break;
            case ('priest'):
                newSoldier = new Priest(character);
                break;
            case ('warrior'):
                newSoldier = new Warrior(character);
                break;
        }
        return newSoldier!
    }

    private static ShowStatus(soldiers: Soldier | Soldier[]): SoldierStatus | SoldierStatus[] {
        if (soldiers instanceof Array) {
            const SoldierArray: SoldierStatus[] = [];
            soldiers.forEach(s => SoldierArray.push(s.status()));
            return SoldierArray
        } else {
            const soldierStatus = soldiers.status()
            return soldierStatus
        }
    }
}