import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monsters')
export class Monster {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'integer' })
    dificulty: number
}