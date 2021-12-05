import { Audience } from '../../src/step01-me/Audience';
import { Bag } from '../../src/step01-me/Bag';
import { Invitation } from '../../src/step01-me/Invitation';
import { TicketSeller } from '../../src/step01-me/TicketSeller';
import { TicketOffice } from '../../src/step01-me/TicketOffice';
import { Ticket } from '../../src/step01-me/Ticket';
import { Theater } from '../../src/step01-me/Theater';

describe('chap1-step1-me.test', () => {
  it('초대장이 있는 경우는 무료로 입장한다.', () => {
    // given
    const audienceAmount = 10000;
    const invitationDate = new Date('2021-12-4');
    const audience: Audience = createTestAudience(
      audienceAmount,
      invitationDate
    );

    const ticketSellerAmount = 30000;
    const ticketPrice = 2000;
    const theater = new Theater(
      createTestTicketSeller(ticketSellerAmount, ticketPrice)
    );

    // when
    theater.enter(audience);

    // then
    expect(audience.bag.amount).toBe(audienceAmount);
  });

  it('초대장이 없는 경우는 유료로 입장한다.', () => {
    // given
    const audienceAmount = 10000;
    const audience: Audience = createTestAudience(audienceAmount);

    const ticketSellerAmount = 30000;
    const ticketPrice = 2000;
    const theater = new Theater(
      createTestTicketSeller(ticketSellerAmount, ticketPrice)
    );

    // when
    theater.enter(audience);

    // then
    expect(audience.bag.amount).toBe(audienceAmount - ticketPrice);
  });
});

function createTestTicketSeller(
  amount: number,
  ticketPrice: number
): TicketSeller {
  return new TicketSeller(new TicketOffice(amount, new Ticket(ticketPrice)));
}

function createTestAudience(
  audienceAmount: number,
  invitationDate?: Date
): Audience {
  const invitation = invitationDate ? new Invitation(invitationDate) : null;
  return new Audience(new Bag(invitation, audienceAmount));
}
