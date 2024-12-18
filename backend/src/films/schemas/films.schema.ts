import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;
  @Prop()
  daytime: string;
  @Prop()
  hall: number;
  @Prop()
  rows: number;
  @Prop()
  seats: number;
  @Prop()
  price: number;
  @Prop([String])
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;
  @Prop()
  rating: number;
  @Prop()
  director: string;
  @Prop([String])
  tags: string[];
  @Prop()
  title: string;
  @Prop()
  about: string;
  @Prop()
  description: string;
  @Prop()
  image: string;
  @Prop()
  cover: string;
  @Prop([ScheduleSchema])
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
