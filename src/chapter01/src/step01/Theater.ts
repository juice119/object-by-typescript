import { TicketSeller } from './TicketSeller';
import { Ticket } from './Ticket';
import { Audience } from './Audience';

export class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience) {
    if (audience.bag.hasInvitation()) {
      const ticket: Ticket = this.ticketSeller.ticketOffice.getTicket();
      audience.bag.setTicket(ticket);
    } else {
      const ticket: Ticket = this.ticketSeller.ticketOffice.getTicket();
      audience.bag.minusAmount(ticket.getFee());
      this.ticketSeller.ticketOffice.plusAmount(ticket.getFee());
      audience.bag.setTicket(ticket);
    }
  }
}
