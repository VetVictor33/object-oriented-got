import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Char } from './Char';

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(() => Char, char => char.account)
    chars: Char[]
}