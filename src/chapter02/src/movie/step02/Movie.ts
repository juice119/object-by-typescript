import { Money } from '../../money/Money';
import { Screening } from './Screening';
import { DiscountPolicy } from './DiscountPolicy';

export abstract class Movie {
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

  public changeDiscountPolicy(discountPolicy: DiscountPolicy) {
    this.discountPolicy = discountPolicy;
  }

  public calculateMovieFee(screening: Screening): Money {
    return this.fee.minus(this.getDiscountAmount(screening));
  }

  private getDiscountAmount(screening: Screening): Money {
    if (!this.discountPolicy) {
      return Money.ZERO;
    }
    return this.discountPolicy.calculateDiscountAmount(screening);
  }
}
