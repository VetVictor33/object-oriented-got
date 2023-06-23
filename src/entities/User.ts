import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Char } from './Char';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    email: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(() => Char, char => char.user)
    chars: Char[]
}