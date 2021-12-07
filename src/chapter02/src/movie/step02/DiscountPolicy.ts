import { Money } from '../../money/Money';
import { Screening } from './Screening';

export interface DiscountPolicy {
  calculateDiscountAmount(screening: Screening): Money;
}
