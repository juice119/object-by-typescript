import { Money } from '../../money/Money';
import { Screening } from './Screening';
import { DiscountPolicy } from './DiscountPolicy';

export class Movie {
  private title: string;
  private runningTime: number;
  private fee: Money;
  private discountPolicy: DiscountPolicy;

  constructor(
    title: string,
    runningTime: number,
    fee: Money,
    discountPolicy: DiscountPolicy
  ) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountPolicy = discountPolicy;
  }

  public getFee(): Money {
    return this.fee;
  }

  public calculateMovieFee(screening: Screening): Money {
    if (!this.discountPolicy) {
      return this.fee;
    }

    return this.fee.minus(
      this.discountPolicy.calculateDiscountAmount(screening)
    );
  }
}
