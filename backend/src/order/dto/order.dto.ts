import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsEmail,
  IsMobilePhone,
  IsArray,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class GetTicketDTO {
  @Expose()
  @IsUUID()
  film: string;
  @Expose()
  @IsUUID()
  session: string;
  @Expose()
  @IsDateString()
  daytime: string;
  @Expose()
  @IsNumber()
  row: number;
  @Expose()
  @IsNumber()
  seat: number;
  @Expose()
  @IsNumber()
  price: number;
}

export class GetOrderDTO {
  @Expose()
  @IsEmail()
  email: string;
  @Expose()
  @IsMobilePhone('ru-RU')
  phone: string;
  @Expose()
  @IsArray()
  @Type(() => GetTicketDTO)
  tickets: GetTicketDTO[];
}

export type GetOrderResponse = {
  total: number;
  items: GetTicketDTO[];
};
