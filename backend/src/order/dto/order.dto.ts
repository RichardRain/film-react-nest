import {IsString, IsNumber, IsEmail, IsMobilePhone, IsArray} from 'class-validator';

export class GetTicketDTO {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class GetOrderDTO {
  @IsEmail()
  email: string;
  @IsMobilePhone('ru-RU')
  phone: string;
  @IsArray()
  tickets: GetTicketDTO[];
}

