import { Bag } from './Bag';
import { Ticket } from './Ticket';

export class Audience {
  private _bag: Bag;

  constructor(bag: Bag) {
    this._bag = bag;
  }

  buy(ticket: Ticket): number {
    if (this._bag.hasInvitation()) {
      this._bag.setTicket(ticket);
      return 0;
    }
    this._bag.setTicket(ticket);
    this._bag.minusAmount(ticket.getFee());
    return ticket.getFee();
  }

  get bag(): Bag {
    return this._bag;
  }
}
