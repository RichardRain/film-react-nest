export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class TicketWithIdDTO extends TicketDTO {
  id: string; 
}

export class OrderDTO {
  email: string;
  phone: string;
  tickets: TicketDTO[];
}

export class ResponseOrderDTO {
  total: number;
  items: TicketWithIdDTO[];
}
