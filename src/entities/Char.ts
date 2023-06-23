import { OneToMany, JoinColumn, ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Item } from './Item';

@Entity('chars')
export class Char {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    name: string

    @Column({ type: 'text' })
    profession: string

    @ManyToOne(() => User, user => user.chars)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Item, item => item.owner)
    itens: Item[]
}