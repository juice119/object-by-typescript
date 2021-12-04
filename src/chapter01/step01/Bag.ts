import { Invitation } from './Invitation';
import { Ticket } from './Ticket';

export class Bag {
  private amount: number;
  private readonly invitation: Invitation | null;
  private ticket: Ticket;

  constructor(invitation: Invitation | null, amount: number) {
    this.invitation = invitation;
    this.amount = amount;
  }

  hasInvitation(): boolean {
    return this.invitation != null;
  }

  hasTicket(): boolean {
    return this.ticket != null;
  }

  setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount): void {
    this.amount += amount;
  }
}
