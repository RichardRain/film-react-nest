import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {
  IsNumber,
  IsArray,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;
    
    @Column({ type: 'timestamp' })
    @IsDateString()
    daytime: string;
    
    @Column()
    @IsNumber()
    hall: number;
    
    @Column()
    @IsNumber()
    rows: number;
    
    @Column()
    @IsNumber()
    seats: number;
    
    @Column()
    @IsNumber()
    price: number;
    
    @Column('text', { array: true })
    @IsArray()
    taken: string[];

    @Column('uuid')
    @IsUUID()
    filmId: string;

    @ManyToOne(() => FilmEntity, (film) => film.schedule)
    film: FilmEntity;
}