import { Money } from '../../money/Money';
import { Customer } from './Customer';
import { Screening } from './Screening';

export class Reservation {
  private _Screening: Screening;
  private customer: Customer;
  private _fee: Money;
  private audienceCount: number;

  constructor(
    customer: Customer,
    Screening: Screening,
    fee: Money,
    audienceCount: number
  ) {
    this.customer = customer;
    this._Screening = Screening;
    this._fee = fee;
    this.audienceCount = audienceCount;
  }

  get Screening(): Screening {
    return this._Screening;
  }

  get fee(): Money {
    return this._fee;
  }
}
