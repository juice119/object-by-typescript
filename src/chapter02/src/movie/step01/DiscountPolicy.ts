import { DiscountCondition } from './DiscountCondition';
import { Money } from '../../money/Money';
import { Screening } from './Screening';

export abstract class DiscountPolicy {
  private readonly conditions: DiscountCondition[] = [];

  protected constructor(conditions: DiscountCondition[]) {
    this.conditions = conditions;
  }

  public calculateDiscountAmount(screening: Screening): Money {
    for (const condition of this.conditions) {
      if (condition.isSatisfiedBy(screening)) {
        return this.getDiscountAmount(screening);
      }
    }

    return Money.ZERO;
  }

  protected abstract getDiscountAmount(Screening: Screening): Money;
}
