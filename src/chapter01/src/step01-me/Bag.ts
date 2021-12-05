import { Invitation } from './Invitation';
import { Ticket } from './Ticket';

export class Bag {
  private _amount: number;
  private readonly invitation: Invitation | null;
  private ticket: Ticket;

  constructor(invitation: Invitation | null, amount: number) {
    this.invitation = invitation;
    this._amount = amount;
  }

  hold(ticket: Ticket): number {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    }
    this.setTicket(ticket);
    this.minusAmount(ticket.getFee());
    return ticket.getFee();
  }

  private hasInvitation(): boolean {
    return this.invitation != null;
  }

  private hasTicket(): boolean {
    return this.ticket != null;
  }

  private setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  private minusAmount(amount: number): void {
    this._amount -= amount;
  }

  public plusAmount(amount): void {
    this._amount += amount;
  }

  get amount(): number {
    return this._amount;
  }
}
