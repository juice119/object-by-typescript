import { Ticket } from './Ticket';

export class TicketOffice {
  private amount = 0;
  private tickets: Ticket[] = [];

  constructor(amount: number, ticket: Ticket) {
    this.amount = amount;
    this.tickets.push(ticket);
  }

  public getTicket(): Ticket {
    return this.tickets.shift();
  }

  public minusAmount(amount: number) {
    this.amount -= amount;
  }

  public plusAmount(amount: number) {
    this.amount += amount;
  }
}
