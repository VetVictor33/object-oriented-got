import { ManyToOne, JoinColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './Chararacter';

@Entity('itens')
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'integer' })
    value: number

    @Column({ type: 'text' })
    description: string

    @ManyToOne(() => Character, char => char.itens)
    @JoinColumn({ name: 'owner_id' })
    owner: Character
}