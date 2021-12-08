export class Money {
  public static ZERO: Money = Money.wons(0);
  private readonly _amount: number;

  constructor(amount: number) {
    this._amount = amount;
  }

  public static wons(amount: number): Money {
    return new Money(amount);
  }

  plus(amount: Money): Money {
    return new Money(this._amount + amount._amount);
  }

  minus(amount: Money): Money {
    return new Money(this._amount - amount._amount);
  }

  times(percent: number): Money {
    return new Money(this._amount * percent);
  }

  isLessThan(other: Money): boolean {
    return this._amount < other._amount;
  }

  isGreaterThanOrEqual(other: Money): boolean {
    return this._amount >= other._amount;
  }

  equals(object: unknown | Money): boolean {
    if (this == object) {
      return true;
    }

    if (!(object instanceof Money)) {
      return false;
    }

    return object._amount === this._amount;
  }

  toString(): string {
    return this._amount.toString() + '원';
  }

  get amount(): number {
    return this._amount;
  }
}
