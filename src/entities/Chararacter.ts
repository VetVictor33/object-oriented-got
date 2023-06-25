import { OneToMany, JoinColumn, ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account';

@Entity('chars')
export class Character {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    name: string

    @Column({ type: 'text' })
    profession: string

    @Column({ type: 'integer', default: 1 })
    level: number

    @Column({ type: 'float', default: 0 })
    experience: number

    @ManyToOne(() => Account, account => account.chars)
    @JoinColumn({ name: 'account_id' })
    account: Account
}