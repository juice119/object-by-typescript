import { Ticket } from './Ticket';
import { Audience } from './Audience';

export class TicketOffice {
  private amount = 0;
  private tickets: Ticket[] = [];

  constructor(amount: number, ticket: Ticket) {
    this.amount = amount;
    this.tickets.push(ticket);
  }

  sellTicketTo(audience: Audience) {
    this.plusAmount(audience.buy(this.getTicket()));
  }

  private getTicket(): Ticket {
    return this.tickets.shift();
  }

  private minusAmount(amount: number) {
    this.amount -= amount;
  }

  private plusAmount(amount: number) {
    this.amount += amount;
  }
}
