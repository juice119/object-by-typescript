import { DiscountCondition } from '../DiscountCondition';
import { DiscountPolicy } from '../DiscountPolicy';
import { Screening } from '../Screening';
import { Money } from '../../../money/Money';

export class PercentDiscountPolicy extends DiscountPolicy {
  private readonly percent: number;

  constructor(percent: number, conditions: DiscountCondition[]) {
    super(conditions);
    this.percent = percent;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}
