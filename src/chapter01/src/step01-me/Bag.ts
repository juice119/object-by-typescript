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
    this._amount -= amount;
  }

  public plusAmount(amount): void {
    this._amount += amount;
  }

  get amount(): number {
    return this._amount;
  }
}
