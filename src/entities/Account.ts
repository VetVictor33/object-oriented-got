import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './Chararacter';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: Boolean, default: false })
    admin: boolean

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(() => Character, char => char.account)
    chars: Character[]
}