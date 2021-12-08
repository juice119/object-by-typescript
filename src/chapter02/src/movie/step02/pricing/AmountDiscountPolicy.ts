import { DiscountCondition } from '../DiscountCondition';
import { Money } from '../../../money/Money';
import { Screening } from '../Screening';
import { DefaultDiscountPolicy } from '../DefaultDiscountPolicy';

export class AmountDiscountPolicy extends DefaultDiscountPolicy {
  private readonly discountAmount: Money;

  constructor(discountAmount: Money, conditions: DiscountCondition[]) {
    super([...conditions]);
    this.discountAmount = discountAmount;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}
