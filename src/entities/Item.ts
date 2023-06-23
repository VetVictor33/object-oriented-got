import { ManyToOne, JoinColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Char } from './Char';

@Entity('itens')
export class Item {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'integer' })
    value: number

    @Column({ type: 'text' })
    description: string

    @ManyToOne(() => Char, char => char.itens)
    @JoinColumn({ name: 'owner_id' })
    owner: Char
}