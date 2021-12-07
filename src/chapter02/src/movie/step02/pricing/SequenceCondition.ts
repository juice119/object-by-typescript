import { DiscountCondition } from '../DiscountCondition';
import { Screening } from '../Screening';

export class SequenceCondition implements DiscountCondition {
  private readonly sequence: number;

  constructor(sequence: number) {
    this.sequence = sequence;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    return screening.isSequence(this.sequence);
  }
}
