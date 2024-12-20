import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsFQDN,
  IsNotEmpty,
  IsArray,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class GetScheduleDTO {
  @Expose()
  @IsUUID()
  id: string;
  @Expose()
  @IsDateString()
  daytime: string;
  @Expose()
  @IsNumber()
  hall: number;
  @Expose()
  @IsNumber()
  rows: number;
  @Expose()
  @IsNumber()
  seats: number;
  @Expose()
  @IsNumber()
  price: number;
  @Expose()
  @IsArray()
  taken: string[];
}

export class GetFilmDTO {
  @Expose()
  @IsUUID()
  id: string;
  @Expose()
  @IsNumber()
  rating: number;
  @Expose()
  @IsString()
  director: string;
  @Expose()
  @IsArray()
  tags: string[];
  @Expose()
  @IsString()
  title: string;
  @Expose()
  @IsString()
  about: string;
  @Expose()
  @IsString()
  description: string;
  @Expose()
  @IsFQDN()
  image: string;
  @Expose()
  @IsFQDN()
  cover: string;
}

export class GetFullFilmDTO extends GetFilmDTO {
  @Expose()
  @IsNotEmpty()
  @IsArray()
  @Type(() => GetScheduleDTO)
  schedule: GetScheduleDTO[];
}

export class CreateFilmDto {
  @Expose()
  @IsNumber()
  rating: number;
  @Expose()
  @IsString()
  director: string;
  @Expose()
  tags: string[];
  @Expose()
  @IsFQDN()
  image: string;
  @Expose()
  @IsFQDN()
  cover: string;
  @Expose()
  @IsString()
  title: string;
  @Expose()
  @IsString()
  about: string;
  @Expose()
  @IsString()
  description: string;
  @Expose()
  @IsNotEmpty()
  @IsArray()
  @Type(() => GetScheduleDTO)
  schedule: GetScheduleDTO[];
}

export type GetFilmsResponse = {
  total: number;
  items: GetFilmDTO[];
};

export type GetScheduleResponse = {
  total: number;
  items: GetScheduleDTO[];
};
