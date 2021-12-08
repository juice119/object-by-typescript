import { DiscountCondition } from '../DiscountCondition';
import { DayOfWeek } from '../../../enum/DayOfWeek';
import { Screening } from '../Screening';

export class PeriodCondition implements DiscountCondition {
  private dayOfWeek: DayOfWeek;
  private startTime: Date;
  private endTime: Date;

  constructor(dayOfWeek: DayOfWeek, startTime: Date, endTime: Date) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    return (
      screening.getStartTime().getDay() === this.dayOfWeek &&
      this.startTime.getTime() <= screening.getStartTime().getTime() &&
      this.endTime.getTime() >= screening.getStartTime().getTime()
    );
  }
}
