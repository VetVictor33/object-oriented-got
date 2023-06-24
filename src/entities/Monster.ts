import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monsters')
export class Monster {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    name: string

    @Column({ type: 'integer' })
    dificulty: number
}