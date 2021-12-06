import { DiscountPolicy } from '../DiscountPolicy';
import { Money } from '../../../money/Money';
import { Screening } from '../Screening';

export class NoneDiscountPolicy extends DiscountPolicy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getDiscountAmount(screening: Screening): Money {
    return Money.ZERO;
  }
}
