export class Money {
  public static ZERO: Money = Money.wons(0);
  private readonly amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  public static wons(amount: number): Money {
    return new Money(amount);
  }

  plus(amount: Money): Money {
    return new Money(this.amount + amount.amount);
  }

  minus(amount: Money): Money {
    return new Money(this.amount - amount.amount);
  }

  times(percent: number): Money {
    return new Money(this.amount * percent);
  }

  isLessThan(other: Money): boolean {
    return this.amount < other.amount;
  }

  isGreaterThanOrEqual(other: Money): boolean {
    return this.amount >= other.amount;
  }

  equals(object: unknown | Money): boolean {
    if (this == object) {
      return true;
    }

    if (!(object instanceof Money)) {
      return false;
    }

    return object.amount === this.amount;
  }

  toString(): string {
    return this.amount.toString() + '원';
  }
}
