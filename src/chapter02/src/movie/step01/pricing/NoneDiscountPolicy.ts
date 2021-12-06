import { DiscountPolicy } from '../DiscountPolicy';
import { Money } from '../../../money/Money';
import { Screening } from '../Screening';

export class NoneDiscountPolicy extends DiscountPolicy {
  protected getDiscountAmount(screening: Screening): Money {
    return Money.ZERO;
  }
}
