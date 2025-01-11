import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import {
  IsString,
  IsNumber,
  IsFQDN,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
    @PrimaryColumn('uuid')
    @IsUUID()
    id: string;

    @Column()
    @IsNumber()
    rating: number;

    @Column()
    @IsString()
    director: string;

    @Column('text', { array: true})
    @IsArray()
    tags: string[];

    @Column()
    @IsString()
    title: string;

    @Column()
    @IsString()
    about: string;

    @Column()
    @IsString()
    description: string;

    @Column()
    @IsFQDN()
    image: string;

    @Column()
    @IsFQDN()
    cover: string;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
      cascade: true,
    })
    schedule: ScheduleEntity[]
}