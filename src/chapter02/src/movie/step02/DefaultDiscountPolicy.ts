import { DiscountPolicy } from './DiscountPolicy';
import { Screening } from './Screening';
import { Money } from '../../money/Money';
import { DiscountCondition } from '../step01/DiscountCondition';

export abstract class DefaultDiscountPolicy implements DiscountPolicy {
  private readonly conditions: DiscountCondition[] = [];

  protected constructor(conditions: DiscountCondition[]) {
    this.conditions = conditions;
  }

  calculateDiscountAmount(screening: Screening): Money {
    for (const condition of this.conditions) {
      if (condition.isSatisfiedBy(screening)) {
        return this.getDiscountAmount(screening);
      }
    }

    return Money.ZERO;
  }

  abstract getDiscountAmount(screening: Screening): Money;
}
