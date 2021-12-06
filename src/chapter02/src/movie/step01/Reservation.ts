import { Money } from '../../money/Money';
import { Customer } from './Customer';
import { Screening } from './Screening';

export class Reservation {
  private customer: Customer;
  private Screening: Screening;
  private fee: Money;
  private audienceCount: number;

  constructor(
    customer: Customer,
    Screening: Screening,
    fee: Money,
    audienceCount: number
  ) {
    this.customer = customer;
    this.Screening = Screening;
    this.fee = fee;
    this.audienceCount = audienceCount;
  }
}
