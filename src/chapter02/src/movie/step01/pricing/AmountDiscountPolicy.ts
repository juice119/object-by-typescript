import { DiscountPolicy } from '../DiscountPolicy';
import { DiscountCondition } from '../DiscountCondition';
import { Money } from '../../../money/Money';
import { Screening } from '../Screening';

export class AmountDiscountPolicy extends DiscountPolicy {
  private readonly discountAmount: Money;

  constructor(discountAmount: Money, conditions: DiscountCondition[]) {
    super(conditions);
    this.discountAmount = discountAmount;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}
