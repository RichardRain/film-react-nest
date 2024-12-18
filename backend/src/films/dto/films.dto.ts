import { IsString, IsNumber, IsFQDN, IsNotEmpty, IsArray } from 'class-validator';

export class GetScheduleDTO {
  @IsString()
  id: string;
  @IsString()
  daytime: string;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  taken: string[];
}

export class GetFilmDTO {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsNotEmpty()
  @IsArray()
  schedule: GetScheduleDTO[];
}

export class CreateFilmDto {
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()  
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsArray()
  schedule: GetScheduleDTO[];
} 