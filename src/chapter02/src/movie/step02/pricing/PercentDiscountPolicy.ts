import { DiscountCondition } from '../DiscountCondition';
import { Screening } from '../Screening';
import { Money } from '../../../money/Money';
import { DefaultDiscountPolicy } from '../DefaultDiscountPolicy';

export class PercentDiscountPolicy extends DefaultDiscountPolicy {
  private readonly percent: number;

  constructor(percent: number, conditions: DiscountCondition[]) {
    super(conditions);
    this.percent = percent;
  }

  private getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}
