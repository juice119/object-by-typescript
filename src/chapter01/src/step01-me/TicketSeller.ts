import { TicketOffice } from './TicketOffice';
import { Audience } from './Audience';

export class TicketSeller {
  private _ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this._ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience): void {
    /**
     * audience 의존도 수를 낮추기, 위해서 책임 이동 원복.
     */
    this._ticketOffice.plusAmount(audience.buy(this._ticketOffice.getTicket()));
  }
}
