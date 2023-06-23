import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Char } from './Char';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text', unique: true })
    email: string

    @OneToMany(() => Char, char => char.user)
    chars: Char[]
}